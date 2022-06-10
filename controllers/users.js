import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()



try {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_KEY}@cluster0.6p3mf.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`)
    
} catch (error) {
    console.log(error);
};

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
  })

  const userModel =  mongoose.model('usuarios', UserSchema);





export {  userModel };