import mongoose from 'mongoose';




try {
    mongoose.connect("mongodb+srv://valentinaless07:vxEEEVwmM2neKCia@cluster0.6p3mf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
} catch (error) {
    console.log(error);
};

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
  })

  const userModel =  mongoose.model('usuarios', UserSchema);





export {  userModel };