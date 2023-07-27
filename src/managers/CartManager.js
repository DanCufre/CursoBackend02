const fs = require('fs')
const pathToCart = 'src/data/cart.json'


class CartManager{
    crear = async() =>{
        if(fs.existsSync(pathToCart)){
            let data = await fs.promises.readFile(pathToCart,'utf-8')
            let items = JSON.parse(data)
            if(items.length===0){
                let newCart = Object.assign({id:1, products:[]})
                await fs.promises.writeFile(pathToCart, JSON.stringify([newCart], null, 2)) 
                return{message:"Nuevo Carro Creado", id:1}
            }else{
                let newId = items[items.length-1].id+1
                let newCart = {}
                newCart.id = newId
                newCart.products=[]
                items.push(newCart)
                await fs.promises.writeFile(pathToCart, JSON.stringify(items,null,2))
                return{message:"Nuevo Carro Creado", id:newId} 
            }
        }else{
            let newCart = Object.assign({id:1, products:[]})
            await fs.promises.writeFile(pathToCart, JSON.stringify([newCart], null, 2)) 
            return{message:"Nuevo Carro Creado", id:1}
        }
    }
    getById = async(id)=>{
        if(fs.existsSync(pathToCart)){
            let data = await fs.promises.readFile(pathToCart,'utf-8')
            let items = JSON.parse(data)
            let cart = items.find(u => u.id === id)
            if(cart){
                return(cart)
            }
            else{
                return{error:"Id de Carrito no encontrado"}
            }
        }
    }
    addProduct = async (id, newProducts)=>{
        if(!id || !newProducts){
            return{error:"Debe especificar algun dato"}
        }
        else{
            let data = await fs.promises.readFile(pathToCart,'utf-8')
            let items = JSON.parse(data)
            let cart = items.find(u => u.id === id)
            if(cart){
                if(cart.products.length == 0){
                    let timestamp = cart.timestamp
                    let cartsNotId = items.filter(u => u.id !== id)
                    let newCart = Object.assign({id:id, products:newProducts})
                    cartsNotId.push(newCart)
                    await fs.promises.writeFile(pathToCart, JSON.stringify(cartsNotId,null,2))
                    return{message:`Producto Agregado a Carrito id: ${id}`}
                }else{
                    let timestamp = cart.timestamp
                    let products = cart.products
                    let cartsNotId = items.filter(u => u.id !== id)
                    let newerProducts = products.concat(newProducts)
                    let newCart = Object.assign({id:id, products:newerProducts})
                    cartsNotId.push(newCart)
                    await fs.promises.writeFile(pathToCart, JSON.stringify(cartsNotId,null,2))
                    return{message:`Producto Agregado a Carrito id: ${id}`}
                }
            }
            else{
                return{error:"Carrito no encontrado"}
            }
        }
        
    }
}
module.exports = CartManager;