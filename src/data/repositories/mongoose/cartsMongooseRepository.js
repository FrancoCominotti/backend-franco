import cartModel from '../../models/mongoose/cartsModels.js'
import Cart from '../../../domain/entities/cart.js';
import Product from '../../../domain/entities/product.js';


class CartsMongooseRepository {
    async find(){

        const cartsDocument = await cartModel.find();

        return cartsDocument.map(document =>new Cart({
            id:document._id,
            products:document.products.map(product =>({
                id:product._id,
                quantity:product.quantity
            }))
        }))
    }

    async getOne(id){
        const cartDocument= await cartModel.findOne({_id:id}).populate('products._id')

        if( !cartDocument){
            throw new Error ("Cart Not Found")
        }

        return new Cart(
            cartDocument._id,
            cartDocument.products,
        )
    }

    async createOne(data){

        const cartDocument = await cartModel.create(data);

        return new Cart(
            cartDocument._id,
            cartDocument.products,
        )
    }

    async updateOne(id,data)
    {

        const cartDocument = await cartModel
        .findOneAndUpdate ({_id:id},data,{new:true})
        .populate('products._id');


        if(!cartDocument){
            throw new Error ("Cart Not Found")
        }
        
        return new Cart(
            cartDocument._id,
            cartDocument.products.map((product) => new Product(
              product._id,
              product.quantity
            ))
          );
    }

    async modifyQuantity (id,data)
    {
        const cartDocument = await cartModel.findOneAndUpdate ({_id:id},data,{new:true});

        if(!cartDocument){
            throw new Error ("cart Not Found")
        }

        return new Cart(
            cartDocument._id,
            cartDocument.products.map((product) => new Product(
              product._id,
              product.quantity
            ))
          );
    }



    async deleteOne(id)
    {
        return cartModel.deleteOne({_id:id})
    }
}

export default CartsMongooseRepository;