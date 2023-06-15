import productCreateValidation from "../validations/product/productCreateValidation.js";

import idValidation from "../validations/share/idValidation.js";
import productUpdateValidation from '../validations/product/productUpdateValidation.js';

import container from "../../container.js";

class ProductManager{
    constructor()
    {
        this.productRepository = container.resolve('ProductRepository');
    }

    async find()
    {
        return this.productRepository.find()
    }

    async getOne (id)
    {
        await idValidation.parseAsync({id})
        return this.productRepository.getOne(id)
    }

    async create (data)
    {
        await productCreateValidation.parseAsync(data)
        return this.productRepository.create(data)
    }

    async updateOne (id,data)
    {
        await productUpdateValidation.parseAsync({...data,id})
        return this.productRepository.updateOne(id,data)
    }

    async deleteOne(id)
    {
        await idValidation.parseAsync({id})
        return this.productRepository.deleteOne(id)
    }

    // async addImageById(id,data)
    // {

    //     return this.productDao.addImageById(id,data)
    // }

}

export default ProductManager