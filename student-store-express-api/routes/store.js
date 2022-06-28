const express = require('express')
const Store  = require('../models/store.js')
const router = express.Router()

router.get("/", async (req, res, next) => {
    const products = Store.listAllProducts()
    res.status(201).send({"product" : products})
})

router.get("/:productId",  (req, res) => {
    const {productId} = req.params
    const prodcut = Store.fetchProduct(productId)
    res.send({"product" : prodcut})
})

router.post("/", (req, res, next) => {
    try {
        const shoppingCart = req.body.shoppingCart
        const user = req.body.user
        const purchase = Store.createPurchaseOrder(shoppingCart, user)
        res.status(201).send({"purchase" : purchase})
    }
    catch (err) {
        next(err)
    }
})
module.exports = router