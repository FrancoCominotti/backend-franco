import idValidation from "../validations/share/idValidation.js";
import { generateTicketCode } from "../../shared/codeGenerator.js";

import nodemailer from 'nodemailer'

import container from "../../container.js";
import { sendMail } from "../../shared/mail.js";

class TicketManager 
{
    constructor()
    {
        {
            this.ticketRepository = container.resolve('TicketRepository');
            this.cartRepository = container.resolve('CartRepository');
            this.productRepository = container.resolve('ProductRepository');
        }
    }

    async getOne (id)
    {
        await idValidation.parseAsync({id})
        return this.ticketRepository.getOne(id)
    }

    async purchaseCart(cid, purchaser)
    {
        const cart = await this.cartRepository.getOne(cid);
        const products = cart.products;
        const totalAmount = products.reduce((total, item) => total + (item._id.price * item.quantity), 0);
        const amount =  totalAmount
        const code = generateTicketCode()


         // Verificar el stock y restar la cantidad correspondiente de cada producto
         for (const product of products) 
         {
            const existingProduct = await this.productRepository.getOne(product._id);
            
            if (product.quantity > existingProduct.stock) {
              throw new Error(`Insufficient stock for product ${existingProduct.id}`);
            }

            existingProduct.stock -= product.quantity;

            await this.productRepository.updateOne(existingProduct.id, existingProduct);
          }

          

        const ticket = await this.ticketRepository.create({
            code,
            purchase_datetime: new Date(),
            amount,
            purchaser,
          });


       sendMail(ticket,purchaser)
            
        return ticket;
    }

    async updateOne (id,data)
    {
        return this.ticketRepository.updateOne(id,data)
    }

    async deleteOne(id)
    {
        await idValidation.parseAsync({id})
        return this.ticketRepository.deleteOne(id)
    }

}

export default TicketManager