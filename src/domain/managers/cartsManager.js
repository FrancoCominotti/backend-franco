// import CartMongooseDao from "../../data/repositories/mongoose/cartsMongooseDao.js";
// import ProductMongooseDao from '../../data/repositories/mongoose/productsMongooseDao.js';

import idValidation from "../validations/share/idValidation.js";

import cartUpdateValidation from "../validations/cart/cartUpdateValidation.js";
import idValidationCartProduct from "../validations/cart/idValidationCart-Products.js";
import cartModifyQuantityValidation from '../validations/cart/cartModifyQuantity.js';

import container from "../../container.js";

class CartManager{
    constructor()
    {
        this.cartRepository = container.resolve('CartRepository');
        this.productRepository= container.resolve('ProductRepository');
    }

    async find()
    {

        return this.cartRepository.find()
    }

    async getOne(id)
    {
        await idValidation.parseAsync({id})
        return this.cartRepository.getOne(id)
    }

    async createOne(data)
    {
        return this.cartRepository.createOne(data)
    }

    async updateOne (id,data)
    {
      await cartUpdateValidation.parseAsync({...data,id})
      return this.cartRepository.updateOne(id,data)
    }


    //Agregar un producto o crear uno de no tener
    async addProduct(cid, pid) {

      await idValidationCartProduct.parseAsync({cid,pid});

      const cart = await this.cartRepository.getOne(cid);
      const product = await this.productRepository.getOne(pid);

      const existingProduct = cart.products.find(p => p.id.equals(pid));

      console.log(existingProduct)

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({ _id: pid, quantity: 1 });
      }
    
      await this.cartRepository.updateOne(cid, cart);
  }


  //Modificar la cantidad de elementos por body
  async modifyQuantity(cid, pid, quantity) {

    await cartModifyQuantityValidation.parseAsync({cid,pid,quantity});


    const cart = await this.cartRepository.getOne(cid);
    const product = await this.productRepository.getOne(pid);

  
    const existingProduct = cart.products.find((p) => p._id.equals(pid));
    
    if (existingProduct) {
      existingProduct.quantity = quantity;
    }
  
    await this.cartRepository.updateOne(cid, cart);
  }


  //Eliminar productos de un carrito de a uno

  
  async  deleteOneProduct(cid, pid)
  {
    await idValidationCartProduct.parseAsync({cid,pid});


    const cart = await this.cartRepository.getOne(cid);
    const product = await this.productRepository.getOne(pid);

    const existingProduct = cart.products.find((p) => p._id.equals(pid));

    
    if (existingProduct.quantity >=1) {
      existingProduct.quantity--;
    } else {
      this.cartRepository.deleteOne(cid);
    }
  
    await this.cartRepository.updateOne(cid, cart);
  }

  //Eliminar todo lo del carrito carrito 
  async deleteOne(id)
  {
      await idValidation.parseAsync({id})
      return this.cartRepository.deleteOne(id)
  }


}

 
export default CartManager