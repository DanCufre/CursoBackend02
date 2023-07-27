const express = require('express')
const productRouter = require('./routes/Products')
const cartRouter = require('./routes/Cart')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.get('*', function (req, res) {
    res.send({ status: "error", description: `ruta ${req.url} método ${req.method} no implementado` });
}
)
const server = app.listen(8080, () => console.log("Listening en puerto 8080"))