const express = require('express')
const router = express.Router()
const ProductManager = require('../managers/ProductManager')
const ProductService = new ProductManager()

router.get('/', (req, res) => {
    ProductService.getAll().then(result => res.send(result))
})
router.get('/:id', (req, res) => {
    let param = req.params.id
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
    let id = parseInt(param)
    ProductService.getById(id).then(result => res.send(result))
})
router.post('/', (req, res) => {
    let product = req.body
    ProductService.agregar(product).then(result => res.send(result))
})
router.put('/:id', (req, res) => {
    let param = req.params.id
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
    let id = parseInt(param)
    let product = req.body
    ProductService.actualizar(product, id).then(result => res.send(result))
})
router.delete('/:id', (req, res) => {
    let param = req.params.id
    if (isNaN(param)) return (res.status(400).send({ error: "No es un numero" }))
    let id = parseInt(param)
    ProductService.deleteById(id).then(result => res.send(result))
})

module.exports = router 