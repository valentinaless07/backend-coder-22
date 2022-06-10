import { Router } from "express";
import {fork} from "child_process"


const router = Router()

router.get('/api/randoms', (req, res) => {

    const random = fork('./controllers/randomnums.js')
    
    

    random.on('message', res => {

        random.send(req.query.cant)
        
        res.json(res)
        
    })
 })
 

export {
    router as random
}

