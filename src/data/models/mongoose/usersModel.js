import mongoose, { Schema } from 'mongoose';
import paginate from "mongoose-paginate-v2";


const userCollection = 'users Coder Project-2';

const userSchema = new mongoose.Schema({
    //Propiedades que querramos que tenga el usuario en nuestra base de datos
    firstName:  { type: Schema.Types.String, required: true },
      lastName:  { type: Schema.Types.String, required: true },
      email: { type: Schema.Types.String, unique: true, required: true },
      age: { type: Schema.Types.Number, default: 18 },
      password: {type: Schema.Types.String,required: true},
      role:{type:Schema.Types.ObjectId,index:true,ref:'roles', default: "6494b9ec1405764b428f7a97"},
      isAdmin: { type: Schema.Types.Boolean, default: false },
      cart:{type:Schema.Types.ObjectId,index:true,ref:'carts'},
    });

userSchema.plugin(paginate);

userSchema.pre('find', function () {
  this.populate(['role']);
});

userSchema.pre('findOne', function () {
  this.populate(['role'])
  this.populate(['cart'])
});


//Con mongoose model generamos el modelo funcional de usuarios conectados a la base de datos , la parte del cuerpo es el userSchema, pero el userModel refiere a la parte funcional
const userModel = mongoose.model(userCollection,userSchema);

export default userModel