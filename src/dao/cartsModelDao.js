import cartModel from '../models/cartsModels.js'

class CartMongooseDao {
    async find(){

        const cartsDocument = await cartModel.find();
        return cartsDocument.map(document =>({
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

        return{
            id:cartDocument._id,
            products: cartDocument.products,
        }
    }

    async createOne(data){

        const cartDocument = await cartModel.create(data);

        return{
            id:cartDocument._id,
            products: cartDocument.products,
        }
    }

    async updateOne(id,data)
    {

        const cartDocument = await cartModel
        .findOneAndUpdate ({_id:id},data,{new:true})
        .populate('products._id');


        if(!cartDocument){
            throw new Error ("Cart Not Found")
        }
        
        return{
            id: cartDocument._id,
            products: cartDocument.products.map((product) => ({
              id: product._id,
              quantity: product.quantity,
        }))}
    }

    async modifyQuantity (id,data)
    {
        const cartDocument = await cartModel.findOneAndUpdate ({_id:id},data,{new:true});

        if(!cartDocument){
            throw new Error ("cart Not Found")
        }

        return{
            id: cartDocument._id,
            products: cartDocument.products.map((product) => ({
              id: product._id,
              quantity: product.quantity,
        }))}
    }



    async deleteOne(id)
    {
        return cartModel.deleteOne({_id:id})
    }
}

export default CartMongooseDao