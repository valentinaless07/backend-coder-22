import mongoose from 'mongoose';



try {
    mongoose.connect("mongodb+srv://valentinaless07:vxEEEVwmM2neKCia@cluster0.6p3mf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
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

export const servicePostMessage = async (msg) => {
    const newMsg = await new msjModel(msg)
    newMsg.save()
    return true
}

export const serviceGetMessages = async ()  => {
    return await msjModel.find();
}