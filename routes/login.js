import { Router } from "express";


const router = Router()




router.post('/setuser', (req, res) => {
    try {
        process.env.username = req.body.user;
        req.session.user = req.body.user;
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
    
    
})

router.get('/getuser', (req, res) => {
    try {
       
        if (req.session?.user) {
            res.status(200).json(req.session.user)
        } 
        else if(process?.env?.username){
            res.status(200).json(process.env.username)
        }
        else {
            res.status(404).json({msg: "Usuario no encontrado"})
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {console.log(err);} 
            
            else {
                
                res.redirect('/msg');
            }
        })
    } catch (err) {
        console.log(err);
    }
})



export {
    router as login
}