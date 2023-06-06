import userModel from "../models/usersModel.js";
import { createHash } from "../utils/hash.js";


class UserMongooseDao
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const userDocuments = await userModel.paginate({}, { limit, page });

    userDocuments.docs = userDocuments.docs.map(document => ({
      id: document._id,
      firstName: document.firstName,
      lastName: document.lastName,
      email: document.email,
      age: document.age,
      isAdmin: document.isAdmin,
    }));

    return userDocuments;
  }

  async getOne(id)
  {
    const userDocument = await userModel.findOne({ _id: id });

    if(!userDocument)
    {
      throw new Error('User Not Found');
    }

    return {
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument.isAdmin,
        role: userDocument.role,
        cart:userDocument.cart,
    }
  }

  async getOneByEmail(email)
  {
    const userDocument = await userModel.findOne({ email });


    return {
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password,
        isAdmin: userDocument?.isAdmin,
        role: userDocument.role,
        cart:userDocument.cart,
    }
  }

  async create(data)
  {
    const userDocument = await userModel.create(data);

    //const hashedPassword = await createHash(password);
    // const userDocument = await userModel.create({
    //     firstName,
    //     lastName,
    //     email,
    //     age,
    //     password: hashedPassword,
    //     isAdmin
    //   });

  

    return {
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        password: userDocument.password,
        isAdmin:userDocument.isAdmin
    }
  }

  async updateOne(id, data)
  {
    const userDocument = await userModel.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!userDocument)
    {
      throw new Error('User Not Found');
    }

    return {
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        isAdmin: userDocument?.isAdmin,
        cart: userDocument?.cart,
    }
  }


  async addCart(id, cartId)
  {
    const userDocument = await userModel.findOneAndUpdate(
      { _id: id },{ cart: cartId  },
      { new: true }
    );

    if(!userDocument)
    {
      throw new Error('User Not Found');
    }

    return {
        cart: userDocument.cart,
    }
  }

  async deleteOne(id)
  {
    return userModel.deleteOne({ _id: id });
  }
}

export default UserMongooseDao;