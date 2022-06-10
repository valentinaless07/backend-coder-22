import mongoose from 'mongoose';
import { normalizeMsg } from './normalizr.js';

import dotenv from "dotenv"

dotenv.config()

try {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_KEY}@cluster0.6p3mf.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
    console.log("Conectado a mongoDb");
} catch (error) {
    console.log(error);
};


const msjSchema = new mongoose.Schema({
    author: {
        id: { type: String, required: true},
        nombre: { type: String, required: true },
        apellido: { type: String, required: true},
        edad: { type: Number, required: true },
        alias: { type: String, required: true },
        avatar: { type: String, required: true}
    },
    text: { type: String, required: true},
    date: {type: String, required:true}
});

const msjModel =  mongoose.model('mensajes', msjSchema);

const postMessage = async (msg) => {
    const newMsg = new msjModel(msg);
    try {
        newMsg.save()
    } catch (error) {
        throw new Error(error);
    }
}

const getMessages  = async () => {
    try {
        const messages = await msjModel.find();
        
        return normalizeMsg(messages);
    } catch (error) {
        throw new Error(error);
    }
}

export { postMessage, getMessages };
