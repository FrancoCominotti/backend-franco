import productModel from "../../models/mongoose/productsModels.js";
import Product from "../../../domain/entities/product.js";

class ProductsMongooseRepository {
  async find() {
    const productsDocument = await productModel.find();

    const products = productsDocument.map((document) => new Product({
      id: document._id,
      title: document.title,
      description: document.description,
      code: document.code,
      price: document.price,
      stock: document.stock,
      category: document.category,
      thumbnail: document.thumbnail
    }));

    return {
      products
    };
  }

  async getOne(id) {
    const productDocument = await productModel.findOne({ _id: id });

    if (!productDocument) {
      throw new Error("Product Not Found");
    }

    return new Product(
      productDocument._id,
      productDocument.title,
      productDocument.description,
      productDocument.code,
      productDocument.price,
      productDocument.stock,
      productDocument.category,
      productDocument.thumbnail
    );
  }

  async create(data) {
    const productDocument = await productModel.create(data);

    return new Product(
      productDocument._id,
      productDocument.title,
      productDocument.description,
      productDocument.code,
      productDocument.price,
      productDocument.stock,
      productDocument.category,
      productDocument.thumbnail
    );
  }

  async updateOne(id, data) {
    const productDocument = await productModel.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!productDocument) {
      throw new Error("Product Not Found");
    }

    return new Product(
      productDocument._id,
      productDocument.title,
      productDocument.description,
      productDocument.code,
      productDocument.price,
      productDocument.stock,
      productDocument.category,
      productDocument.thumbnail
    );
  }

  async deleteOne(id) {
    const productDocument = await productModel.findOne({ _id: id });

    if (!productDocument) {
      throw new Error("Product Not Found");
    }

    return productModel.deleteOne({ _id: id });
  }
}

export default ProductsMongooseRepository;

    // async addImageById(id,data)
    // {
    //     const productDocument = await productModel.findOneAndUpdate({ _id: id }, data, { new: true });


    //     if(!productDocument){
    //         throw new Error ("Product doesn't exist")
    //     }

    //     return {
    //         thumbnail:productDocument.thumbnail
    //     }
    // }

//export default ProductsMongooseRepository;