import ProductMongooseDao from "../dao/productsModelDao.js";

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
        return this.productDao.getOne(id)
    }

    async create (data)
    {
        return this.productDao.create(data)
    }

    async updateOne (id,data)
    {
        return this.productDao.updateOne(id,data)
    }

    async deleteOne(id)
    {
        return this.productDao.deleteOne(id)
    }

    async addImage(id)
    {
        return this.productDao.addImage(id)
    }

}

export default ProductManager