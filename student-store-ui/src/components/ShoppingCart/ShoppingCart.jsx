import * as React from "react"
import "./ShoppingCart.css"

export default function ShoppingCart(props) {
    function totalPrice() {
        let totalPrice = 0
        props.shoppingCart.forEach(item => {
            totalPrice += item.quantity * props.products[item.itemId - 1].price
        })
        return totalPrice
    }
    return (
        <div className={props.isOpen ? "shopping-cart":"shopping-cart hidden"}>
            <div className={props.isOpen ? "cart-product-name" : "cart-product-name hidden"}>
                <table>
                    <tr class="tabletitle">
                        <td class="item"><h2>Item</h2></td>
                        <td class="Hours"><h2>Qty</h2></td>
                        <td class="Rate"><h2>Sub Total</h2></td>
                    </tr>
            {props.shoppingCart.map(item => {
                return (
                    <tr class="service">
                        <td class="tableitem"><p class="itemtext">{props.products[item.itemId - 1].name}</p></td>
                        <td class="tableitem"><p class="itemtext">{item.quantity}</p></td>
                        <td class="tableitem"><p class="itemtext">${(item.quantity * props.products[item.itemId - 1].price).toFixed(2)}</p></td>
                    </tr>
                    )
                })}
                </table>
            </div>
            <div className={(props.isOpen && totalPrice() > 0) ? "total":"total hidden"}>
                <table>
                    <tr class="tabletitle">
                        <td></td>
                        <td class="Rate"><h2>Subtotal</h2></td>
                        <td class="payment"><h2>${totalPrice().toFixed(2)}</h2></td>
                    </tr>

                    <tr class="tabletitle">
                        <td></td>
                        <td class="Rate"><h2>Tax</h2></td>
                        <td class="payment"><h2>${(totalPrice() * 0.0875).toFixed(2)}</h2></td>
                    </tr>

                    <tr class="tabletitle">
                        <td></td>
                        <td class="Rate"><h2>Total</h2></td>
                        <td class="payment"><h2>${(totalPrice() * 0.0875 + totalPrice()).toFixed(2)}</h2></td>
                    </tr>
                </table>
            </div>

            <div id="legalcopy" className={(props.isOpen && totalPrice() == "0") ? "legal":"legal hidden"}>
                <p>No items added to cart yet. Start shopping now!</p>
            </div>
            <div id="legalcopy" className={props.isOpen && totalPrice() > 0 ? "legal":"legal hidden"}>
                <p class="legal"><strong>Thank you for your business!</strong></p>
            </div>
        </div>
    )
}