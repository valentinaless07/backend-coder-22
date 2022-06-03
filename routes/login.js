import { Router } from "express";
import passport from "passport"

const router = Router()




// router.post('/setuser', (req, res) => {
//     console.log("setuser")
//     try {
//         process.env.username = req.body.user;
//         req.session.user = req.body.user;
//         res.redirect("/")
//     } catch (error) {
//         console.log(error)
//     }
    
    
// })

router.get('/getuser', (req, res) => {
    try {
       
        if(process?.env?.username){
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
 
            
           
                req.logout(function(err) {
                    if (err) { return err; }
                    res.redirect('/msg');
                  });
                
            
        
    } catch (err) {
        console.log(err);
    }
})

router.post('/login', passport.authenticate("login", {successRedirect: "/", failureRedirect: "/loginerror", passReqToCallback: true}))



export {
    router as login
}