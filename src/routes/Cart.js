const express = require('express')
const router = express.Router()

const CartManager = require('../managers/CartManager.js')
const CartService = new CartManager()
const ProductManager = require('../managers/ProductManager')
const ProductService = new ProductManager()

router.post('/', (req, res) => {
    CartService.crear().then(result => res.send(result))
})

router.post('/:cid/products', async (req, res) => {
    let param = req.params.cid
    let productsId = req.body
    let realProducts = []
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
    let id = parseInt(param)
    await Promise.all(productsId.map(async (products) => {
        let verifier = await ProductService.getById(id)
        if (!verifier.error) {
            realProducts.push(products)
        }
    })).then(CartService.addProduct(id, realProducts).then(result => res.send(result)))
})

router.get('/:cid', async (req, res) => {
    let param = req.params.cid
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
    let cid = parseInt(param)
    let cart = await CartService.getById(cid)
    res.send(cart.products)
})

module.exports = router 