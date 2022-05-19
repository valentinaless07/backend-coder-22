import faker from "@faker-js/faker";
import { Router } from "express";


const router = Router()

router.get('/productos-test', async (req,res) => {
    try {
        let products = [];
        for (let i = 0; i < 5; i++) {
            products.push({
                title: faker.commerce.product(),
                price: faker.commerce.price(),
                thumbnail: faker.image.image()
            });
        }
    
    res.status(200).send(products)
    } catch (error) {
        console.log(error)
    }
    
})


export {
    router
}