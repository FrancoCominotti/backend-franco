import mongoose, { Schema } from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({



    //courses: [{ type: Schema.Types.ObjectId, index: true, ref: 'products', default: [] }],
    products:{
      type:[
          {
              _id:{
                  type:mongoose.Schema.Types.ObjectID,
                  ref:'products',
              },
              quantity:{type: Number,required: true}
          }
      ],
      default:[]
  }
});

cartsSchema.pre('find', function (){
    this.populate(['products']);
})


//Con mongoose model generamos el modelo funcional de usuarios conectados a la base de datos , la parte del cuerpo es el userSchema, pero el userModel refiere a la parte funcional
const cartModel = mongoose.model(cartsCollection,cartsSchema);

export default cartModel