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
      age: document.age
    }));

    return userDocuments;
  }

  async getOne(id)
  {
    const userDocument = await userModel.findOne({ _id: id });

    if(!userDocument)
    {
      throw new Error('User doesnt exist.');
    }

    return {
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password
    }
  }

  async getOneByEmail(email)
  {
    const userDocument = await userModel.findOne({ email });

    // if(!userDocument)
    // {
    //   throw new Error('User dont exist.');
    // }

    return {
        id: userDocument?._id,
        firstName: userDocument?.firstName,
        lastName: userDocument?.lastName,
        email: userDocument?.email,
        age: userDocument?.age,
        password: userDocument?.password
    }
  }

  async create(data)
  {
    const { firstName, lastName, email, age, password } = data;
    const hashedPassword = await createHash(password);
    const userDocument = await userModel.create({
        firstName,
        lastName,
        email,
        age,
        password: hashedPassword,
      });
    

    return {
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age,
        password: userDocument.password,
    }
  }

  async updateOne(id, data)
  {
    const userDocument = await userModel.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return {
        id: userDocument._id,
        firstName: userDocument.firstName,
        lastName: userDocument.lastName,
        email: userDocument.email,
        age: userDocument.age
    }
  }

  async deleteOne(id)
  {
    return userModel.deleteOne({ _id: id });
  }
}

export default UserMongooseDao;