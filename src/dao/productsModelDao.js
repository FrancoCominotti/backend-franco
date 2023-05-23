import productModel  from "../models/productsModels.js";
import uploader from "../middlewares/multer.js";
class ProductMongooseDao {
    async find(){

        const productsDocument = await productModel.find();
        return productsDocument.map(document =>({
            id:document._id,
            title: document.title,
            description: document.description,
            code:document.code,
            price:document.price,
            stock:document.stock,
            category:document.category,
            thumbnail:document.thumbnail
        }))
    }

    async getOne(id){
        const productDocument= await productModel.findOne({_id:id})

        if( !productDocument){
            throw new Error ("Product doesn't exist")
        }

        return{
            id:productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code:productDocument.code,
            price:productDocument.price,
            stock:productDocument.stock,
            category:productDocument.category,
            thumbnail:productDocument.thumbnail
        }
    }

    async create (data){
        const productDocument = await productModel.create(data);

        return {
            id:productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code:productDocument.code,
            price:productDocument.price,
            stock:productDocument.stock,
            category:productDocument.category,
            thumbnail:productDocument.thumbnail
        }
    }

    async updateOne (id,data){
        const productDocument = await productModel.findOneAndUpdate({_id:id},data,{new:true})

        if(!productDocument){
            throw new Error ("Product doesn't exist")
        }

        return {
            id:productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code:productDocument.code,
            price:productDocument.price,
            stock:productDocument.stock,
            category:productDocument.category,
            thumbnail:productDocument.thumbnail
        }
    }

    async deleteOne(id)
    {
        const productDocument= await productModel.findOne({_id:id})

        if( !productDocument){
            throw new Error ("Product doesn't exist")
        }
        
        return productModel.deleteOne({_id:id})
    }

    // async addImage(id,data)
    // {
    //     const productDocument = await productModel.findOneAndUpdate({_id:id},data,{new:true})

    //     if(!productDocument){
    //         throw new Error ("Product doesn't exist")
    //     }

    //     return {
    //         thumbnail:productDocument.thumbnail
    //     }
    // }
}

export default ProductMongooseDao