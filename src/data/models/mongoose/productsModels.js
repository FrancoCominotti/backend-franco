
import mongoose, {Schema} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    //Propiedades que querramos que tenga el usuario en nuestra base de datos
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    code:{type:Schema.Types.String,require:true, unique: true },
    price:{type:Schema.Types.Number,require:true},
    stock:{type:Schema.Types.Number,require:true},
    category:{type: Schema.Types.String,require:true},
    thumbnail:{type: Schema.Types.String}

    
});

productsSchema.plugin(mongoosePaginate)

//Con mongoose model generamos el modelo funcional de usuarios conectados a la base de datos , la parte del cuerpo es el userSchema, pero el userModel refiere a la parte funcional

const productModel = mongoose.model(productsCollection,productsSchema);


 export default productModel