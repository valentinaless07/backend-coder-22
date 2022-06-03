import passport from "passport"
import localStrategy from "passport-local"
import { userModel } from "../controllers/users.js"
import bcrypt from "bcrypt"

const salt = await bcrypt.genSalt(10);

passport.serializeUser((user, done)=> {
    done(null, user._id)
})

passport.deserializeUser(async (_id, done)=> {
    const user = await userModel.findById(_id)
    done(null, user)
})

passport.use("login", new localStrategy.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user  = await userModel.findOne({email})
    if(!user){
        return done(null, false)
    }
    const compare = await bcrypt.compare(password, user.password)
    
    if(!compare){
        return done(null, false)
    }

    process.env.username = email

    done(null, user)
}))

passport.use("signup", new localStrategy.Strategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req, email, password, done) => {
    

    userModel.findOne({"email": email}, function (err, user){
        if(err){
            return done(err)
        }

        if (user) {
            console.log('User already exists');
            return done(null, false)
          }
     
    })

    const user = new userModel()
    
    user.email = email
    
    user.password =  await bcrypt.hash(password, salt);
    await user.save()
    process.env.username = user.email
    done(null, user)
    
}))