import ProductMongooseDao from "../dao/productsModelDao.js";
import productCreateValidation from "../validations/product/productCreateValidation.js";
import idValidation from '../validations/share/idValidation.js';
import productUpdateValidation from '../validations/product/productUpdateValidation.js';


class ProductManager{
    constructor()
    {
        this.productDao = new  ProductMongooseDao()
    }

    async find()
    {
        return this.productDao.find()
    }

    async getOne (id)
    {
        await idValidation.parseAsync({id})
        return this.productDao.getOne(id)
    }

    async create (data)
    {
        await productCreateValidation.parseAsync(data)
        return this.productDao.create(data)
    }

    async updateOne (id,data)
    {
        await productUpdateValidation.parseAsync({...data,id})
        return this.productDao.updateOne(id,data)
    }

    async deleteOne(id)
    {
        await idValidation.parseAsync({id})
        return this.productDao.deleteOne(id)
    }

    // async addImageById(id,data)
    // {

    //     return this.productDao.addImageById(id,data)
    // }

}

export default ProductManager