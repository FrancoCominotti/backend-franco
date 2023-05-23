import mongoose from 'mongoose';
import paginate from "mongoose-paginate-v2";

const userCollection = 'users Coder Project-2';

const userSchema = new mongoose.Schema({
    //Propiedades que querramos que tenga el usuario en nuestra base de datos
    firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      age: {
        type: Number,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      rol:{
        type:String,
        default:"User",
      }
    });

userSchema.plugin(paginate);
//Con mongoose model generamos el modelo funcional de usuarios conectados a la base de datos , la parte del cuerpo es el userSchema, pero el userModel refiere a la parte funcional
const userModel = mongoose.model(userCollection,userSchema);

export default userModel