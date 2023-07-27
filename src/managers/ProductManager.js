const fs = require('fs')
const pathToData = 'src/data/data.json'


class ProductManager {
    agregar = async (product) => {
        if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category) {
            return { error: "faltan completar algun datos" }
        }
        try {
            if (fs.existsSync(pathToData)) {
                let data = await fs.promises.readFile(pathToData, 'utf-8')
                let products = JSON.parse(data)
                if (products.length === 0) {
                    let newProduct = Object.assign({ id: 1 }, product)
                    await fs.promises.writeFile(pathToData, JSON.stringify([newProduct], null, 2))
                    return { message: "Nuevo Producto Creado", id: 1 }
                } else {
                    let code = product.code
                    //evaluo que no exista el codigo de producto ingresado
                    if (products.find((contenido) => contenido.code === code)) {
                        return { message: "EL producto ya fue Creado", code: code }
                    }
                    let newId = products[products.length - 1].id + 1
                    product.id = newId
                    products.push(product)
                    await fs.promises.writeFile(pathToData, JSON.stringify(products, null, 2))
                    return { message: "Nuevo Producto Creado", id: newId }
                }
            } else {
                let newProduct = Object.assign({ id: 1 }, product)
                await fs.promises.writeFile(pathToData, JSON.stringify([newProduct], null, 2))
                return { message: "Nuevo Producto Creado", id: 1 }
            }
        }
        catch (error) {
            return { message: error }
        }
    }
    actualizar = async (product, id) => {
        let data = await fs.promises.readFile(pathToData, 'utf-8')
        let products = JSON.parse(data)
        if (!products.find((contenido) => contenido.id === id)) {
            return {  message: "Id de Producto Inexistente" }
        }        
        let productsNotId = products.filter(u => u.id !== id)
        let newProduct = Object.assign({ id: id }, product)
        productsNotId.push(newProduct)
        await fs.promises.writeFile(pathToData, JSON.stringify(productsNotId, null, 2))
        return { message: `Producto Modificado id: ${id}` }
    }
    getById = async (id) => {
        if (fs.existsSync(pathToData)) {
            let data = await fs.promises.readFile(pathToData, 'utf-8')
            let products = JSON.parse(data)
            let product = products.find(u => u.id === id)
            if (product) {
                return (product)
            }
            else {
                return { error: "Producto no encontrado" }
            }
        }
    }
    getLimit = async (limit) => {
        if (fs.existsSync(pathToData)) {
            let salida = []
            let limite = limit
            //si el parametro limit existe limito la salida a mostrar
            if (limite >= 0) {
                let limiteLoop = limite
                let data = await fs.promises.readFile(pathToData, 'utf-8')
                let products = JSON.parse(data)
                if (limite > products.length) { limiteLoop = products.legth }
                for (let i = 0; i < limiteLoop; i++) {
                    salida.push(products[i])
                }
                return (salida)
            }
            else {
                let data = await fs.promises.readFile(pathToData, 'utf-8')
                let products = JSON.parse(data)
                let product = products.find(u => u.id === id)
                if (product) {
                    return (product)
                }
                else {
                    return { error: "Producto no encontrado" }
                }
            }
        }
    }
    getAll = async () => {
        if (fs.existsSync(pathToData)) {
            let data = await fs.promises.readFile(pathToData, 'utf-8')
            let products = JSON.parse(data)
            return (products)
        }
    }
    deleteById = async (id) => {
        if (!id) {
            return { error: "Id Debe ingresar un Id de producto" }
        }
        if (fs.existsSync(pathToData)) {
            let data = await fs.promises.readFile(pathToData, 'utf-8')
            let products = JSON.parse(data)
            if (!products.find((contenido) => contenido.id === id)) {
                return {  message: "Id de Producto Inexistente" }
            }              
            let newProducts = products.filter(u => u.id !== id)
            await fs.promises.writeFile(pathToData, JSON.stringify(newProducts, null, 2))
            return { message: "Producto Borrado" }
        }
    }
}
module.exports = ProductManager;