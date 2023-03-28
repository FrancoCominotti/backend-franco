// const { readFileSync, read } = require('fs');
// const { json } = require('stream/consumers');


// const fs = require('fs').promises


import { readFileSync } from 'fs';
import { json } from 'stream/consumers';
import fs from 'fs/promises';

export class ProductManager{

    constructor ()
    {
        this.products =[]
        this.idAuto = 0;
        this.path='Productos.json'
    }

    async readProductsFromFile ()
    {
        //Leo el archivo json (si este existe) y parseo la info dentro de el

        
        try
        {
            await fs.access(this.path);
            const data = await fs.readFile(this.path,'utf-8');
            return this.products = JSON.parse(data)
        } catch (error)
        {
            console.log(`El archivo ${this.path} no existe, creando...`)
            await fs.writeFile(this.path, '[]');
            return []

            console.log(`no se puede leer el archivo ${error.message}`)
            
        }
    }

    async saveProductFiles ()
    {
        // Creo el archivo JSON y stringifeo la info del array products 

        
        //this.readProductsFromFile()
        try 
        {
            
            fs.writeFile (this.path, JSON.stringify(this.products))
        } 
        catch (error)
        {
            console.log(`No puede crearse el archivo: ${error.message}`)
           
        }
    }

    async updateProducts (id,updateProducts)
    {
        try
        {
            // Verifico si existe el producto por su id y me devuelve su ubicacion en el array
            const index = await this.products.findIndex((product) => product.id === id)
            //Si el array existe, reemplazo el producto por su index con el update product

            if( index !== -1)
            {
                this.products[index] = 
                {
                    ...this.products[index],
                    ...updateProducts,
                    id
                }
                await this.saveProductFiles ();
                return true
            } 
            else
            {
            throw new Error("No se encontró el producto con el id proporcionado.");
            }

        } 
        catch (error)
        {
            throw new Error (`No puede actualziarse el elemento: ${error.message}`)
        }

    }

    async deleteProduct(id) {
        try {
          await this.readProductsFromFile();

          //const index = this.products.findIndex((product) => product.id === id);
          const product = this.products.find((product) => product.id === id);
      
          if (product) 
          {

            this.products= this.products.filter((prod) => prod.id !== id)

            await this.saveProductFiles();
            return true;
          }
          return false;

        } 

        catch (error)
        {
          throw new Error(`No se puede eliminar el producto : ${error.message}`);
        }
      }


   addProduct(prod)
    {
        //Verificar si ALGUNO de sus values es undefined
        if (Object.values(prod).some((item) => !item)) { 
            throw new Error("Todos los campos del producto son obligatorios");
        }

        //Verifico que el mismo código no este en uso
        const sameCode = this.products.find(product => product.code === prod.code)

        if(sameCode)
        {
            throw Error ('El código ya está en uso')
        }
      
        //Defino el id y devuelvo el elemento en forma de objeto
        this.idAuto ++
        return this.products.push({ ...prod, id: this.idAuto });
        

    }
    getProducts(){
        //Devuelvo los productos por consola
        this.saveProductFiles();
        return this.products;
    }

    getProductById (id)
    {
        //Busco si el producto existe con el id y si existe me lo devuele sino me tira error
       const product= this.products.find((product)=> product.id ===id);

       if( product)
       {
        return product
       }else
       {
        console.error ('Not found')
       }

    }



}

const productManager = new ProductManager ();

// //Creo el archivo JSON 
productManager.saveProductFiles();
