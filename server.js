import express, { urlencoded } from 'express'
import { router } from './routes/index.js'
import session from 'express-session';
import { login } from './routes/login.js';
import { Server } from "socket.io";
const app = express()
import {postMessage, getMessages} from "./controllers/messages.js"
import path from 'path';
import { fileURLToPath } from 'url';
import MongoStore from 'connect-mongo';
import { userModel } from './controllers/users.js';
import passport from "passport"
import localStrategy from "passport-local"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import * as passportAuth from "./passport/auth.js"
import parseArgs from "minimist"
import { random } from './routes/random.js';

const args = parseArgs(["--port", process.argv[2]?.toString() || 8080]);



app.use(session({
    secret: 'secret',
    store: MongoStore.create({mongoUrl: "mongodb+srv://valentinaless07:vxEEEVwmM2neKCia@cluster0.6p3mf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));
app.use("/public", express.static('./public/'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api', router)
app.use("/", random)
app.use(login)



const server = app.listen(args.port, () => {
    console.log(`Server running on port: ${server.address().port}`)
})



app.get('/', async (req,res) => {
    try {
        
        if (req.isAuthenticated()) {
            res.sendFile(__dirname + '/public/index.html');
        } 
        else{

            res.sendFile(__dirname + '/public/login.html');
        }
        
    } catch (error) {
        console.log(error);
    }
})

app.get('/msg', (req, res) => {
   
    try {
        res.sendFile(__dirname + '/public/message.html');
    } catch (err) {
        console.log(err);
    }
})

app.get('/register', (req, res) => {

   
    try {
        res.sendFile(__dirname + '/public/register.html');
    } catch (err) {
        console.log(err);
    }
})

app.get('/loginerror', (req, res) => {

   
    try {
        res.sendFile(__dirname + '/public/loginError.html');
    } catch (err) {
        console.log(err);
    }
})

app.get('/signupError', (req, res) => {

   
    try {
        res.sendFile(__dirname + '/public/signupError.html');
    } catch (err) {
        console.log(err);
    }
})

app.get('/info', (req, res) => {
    try {
        res.sendFile(__dirname + '/public/info.html');
    } catch (err) {
        console.log(err);
    }
})

app.get('/getinfo', (req, res) => {
    try {
        
        res.status(200).json({
            args: args.port,
            version: process.version,
            platform: process.platform,
            pid: process.pid,
            cwd: process.cwd(),
            execPath: process.argv[1],
            memory: process.memoryUsage().rss
        })
    } catch (err) {
        console.log(err);
    }
})


app.post('/register', passport.authenticate("signup", {successRedirect: "/", failureRedirect: "/signupError", passReqToCallback: true}))




server.on('error', error=> console.log(`Error ${error}`))

const io = new Server(server, {
    
    // ...
  });

  io.on("connection", async (socket) => {
    console.log('Un cliente se ha conectado')


    socket.emit('messages', await getMessages())

    socket.on('new-message', async function(data){
        await postMessage(data)
        const messages = await getMessages()
        socket.emit('messages', messages)
       
    })

});