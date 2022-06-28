const { storage } = require('../data/storage.js')
const {NotFoundError, BadRequestError}= require("../utils/errors.js")
const { use } = require('../app.js')

class Store {
    constructor() {
        this.super()
    }

    static listAllProducts() {
        return storage.get('products').value()
    }

    static fetchProduct(productId) {
        return Store.listAllProducts()[productId - 1]
    }

    static calculateTotal(cart, products, tax) {
        let totalPrice = 0
        cart.forEach(item => {
            totalPrice += item.quantity * products[item.itemId - 1].price
        })
        return (totalPrice * tax).toFixed(2)
    }
    
    static createReceipt(data) {
        let receipt = []
        receipt.push("Showing receipt for " + data.userInfo.name + " available at " + data.userInfo.email +  ":")
        data.cart.forEach(item => {
            receipt.push(item.quantity + " total " + data.products[item.itemId - 1].name
             + " purchased at a cost of $" + (data.products[item.itemId - 1].price).toFixed(2)
             + " for a total cost of $" + (item.quantity * data.products[item.itemId - 1].price).toFixed(2))
        })
    }

    static createPurchaseOrder(cart, userInfo) {
        const currentDate = new Date()

        if (!cart || cart.length == 0) {
            throw new BadRequestError("No items in cart to checkout.")
        }
        if (!userInfo) {
            throw new BadRequestError("No user info found to checkout with.")
        }

        if (!userInfo.hasOwnProperty('name') || !userInfo.hasOwnProperty('email')) {
            throw new BadRequestError("User Info not correctly formatted")
        }
        cart.forEach(item => {
            if (item.itemId === undefined || item.quantity === undefined) {
                throw new BadRequestError("Incorrect shopping cart")
            }
        })
        var valueArr = cart.map(function(item){ return item.itemId });
        var isDuplicate = valueArr.some(function(item, idx){ 
            return valueArr.indexOf(item) != idx 
        });
        if (isDuplicate) {
            throw new BadRequestError("Duplicate Values")
        }
        
        const products = storage.get("products").value();
        const subtotal = Store.calculateTotal(cart, products, 1);
        const total = Store.calculateTotal(cart, products, 1.0875);

        const receipt = Store.createReceipt({
            cart, subtotal, total, products, userInfo
        });

        let purchases = storage.get("purchases").value();
        const purchase = {
            id: purchases.length,
            name: userInfo.name,
            email: userInfo.email,
            total: total,
            order: cart,
            createdAt: currentDate.toString(),
            receipt: receipt
        };

        return storage.get("purchases").push(purchase).write()

    }
}
 
module.exports = Store
