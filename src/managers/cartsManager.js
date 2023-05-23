import CartMongooseDao from "../dao/cartsModelDao.js";
import ProductMongooseDao from '../dao/productsModelDao.js';


class CartManager{
    constructor()
    {
        this.CartDao = new  CartMongooseDao()
        this.ProductDao = new ProductMongooseDao()
    }

    async find()
    {

        return this.CartDao.find()
    }

    async getOne(id)
    {
        return this.CartDao.getOne(id)
    }

    async createOne(data)
    {
        return this.CartDao.createOne(data)
    }

    async updateOne (id,data)
    {
        return this.CartDao(id,data)
    }


    //Agregar un producto o crear uno de no tener
    async addProduct(cid, pid) {
      const cart = await this.CartDao.getOne(cid);
      const product = await this.ProductDao.getOne(pid);


    
      const existingProduct = cart.products.find((p) => p._id.equals(pid));



      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ _id: pid, quantity: 1 });
      }
    
      await this.CartDao.updateOne(cid, cart);
  }


  //Modificar la cantidad de elementos por body
  async modifyQuantity(cid, pid, newQuantity) {
    const cart = await this.CartDao.getOne(cid);
    const product = await this.ProductDao.getOne(pid);
  
    const existingProduct = cart.products.find((p) => p._id.equals(pid));
    
    if (existingProduct) {
      existingProduct.quantity = newQuantity;
    }
  
    await this.CartDao.updateOne(cid, cart);
  }


  //Eliminar productos de un carrito de a uno

  
  async  deleteOneProduct(cid, pid)
  {
    const cart = await this.CartDao.getOne(cid);
    const product = await this.ProductDao.getOne(pid);

    const existingProduct = cart.products.find((p) => p._id.equals(pid));

    
    if (existingProduct.quantity >=1) {
      existingProduct.quantity--;
    } else {
      this.CartDao.deleteOne(cid);
    }
  
    await this.CartDao.updateOne(cid, cart);
  }

  //Eliminar todo lo del carrito carrito 
  async deleteOne(id)
  {
      return this.CartDao.deleteOne(id)
  }


}

 
export default CartManager