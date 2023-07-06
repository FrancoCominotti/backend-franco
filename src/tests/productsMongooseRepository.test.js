import dotenv from "dotenv";
dotenv.config();

import { faker } from '@faker-js/faker';
import DbFactory from "../data/factories/dbFactory.js";
import chai from "chai";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const expect = chai.expect;

const db = DbFactory.create(process.env.DB);

import ProductMongooseRepository from "../data/repositories/mongoose/productsMongooseRepository.js";
import productModel from '../data/models/mongoose/productsModels.js'


describe('Testing Product Mongoose Repository', () => {
    before(function () {
      db.init("mongodb+srv://francopisapia405:uPTbiSDQYTlKc3wm@codercluster.xlmgp1b.mongodb.net/?retryWrites=true&w=majority"); 
      this.productRepository = new ProductMongooseRepository();
    });
  
    after(function () {
      db.drop();
      //db.close();
    });
  
    beforeEach(function () {
      this.timeout(5000);
    });
  
    it('The repository should be an instance of ProductMongooseRepository', function () {
      expect(this.productRepository).to.be.an.instanceOf(ProductMongooseRepository);
    });
  
    it('The repository should be able to create a product', function () {
     const product = {
        title: 'Test Product',
        description: 'This is a test product',
        code: '1234567',
        price: 10.99,
        stock: 100,
        category: 'Test',
        thumbnail: 'https://example.com/image.jpg',
      };
  
      return this.productRepository
        .create(product)
        .then(result => {
          expect(result).to.be.an('object');
          expect(result.title).to.equal(product.title);
          expect(result.description).to.equal(product.description);
          expect(result.code).to.equal(product.code);
          expect(result.price).to.equal(product.price);
          expect(result.stock).to.equal(product.stock);
          expect(result.category).to.equal(product.category);
          expect(result.thumbnail).to.equal(product.thumbnail);
        });
    });


    it('The repository should be able to update a product', function () {

      const productId = '64a4ad8dd63cfecac107a36d';
      const updatedData = {
        title: 'Updated Test Product',
        description: 'This is an updated test product',
      };
  
      return this.productRepository
        .updateOne(productId, updatedData)
        .then(result => {
          expect(result).to.be.an('object');
          expect(result.title).to.equal(updatedData.title);
          expect(result.description).to.equal(updatedData.description);
        });
    });

      it('The repository should be able to delete a product', function () {
        const productId = '64a4b6a6cc9be2e1b6a99222'; // Reemplaza con el ID de un producto existente en tu base de datos
    
        return this.productRepository
          .deleteOne(productId)
          .then(result => {
            expect(result.acknowledged).to.equal(true);
          });
      });
    
      it('The repository should be able to paginate products', function () {
        const criteria = {
          limit: 10,
          page: 1,
        };
    });
})