import { Router } from "express";
import { getProducts } from "../controllers/products.js";


const router = Router()

router.get('/productos-test', async (req,res) => {
    try {
        const products = getProducts()
    
    res.status(200).send(products)
    } catch (error) {
        console.log(error)
    }
    
})


export {
    router
}