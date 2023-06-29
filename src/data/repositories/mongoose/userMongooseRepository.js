import userModel from "../../models/mongoose/usersModel.js"
import User from '../../../domain/entities/user.js';
import Role from "../../../domain/entities/role.js";

class UserMongooseRepository
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const userDocuments = await userModel.paginate({}, { limit, page });
    const { docs, ...pagination } = userDocuments;

    const users = docs.map(document => new User(
      document._id,
      document.firstName,
      document.lastName,
      document.email,
      document.age,
      document.isAdmin,
      document.role ? new Role(
        document.role.id,
        document.role.name,
        document.role.permissions
      ): null
    ));

    return {
      users,
      pagination
    };
  }

  async getOne(id)
  {
    const userDocument = await userModel.findOne({ _id: id });

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User(
        userDocument?._id,
        userDocument?.firstName,
        userDocument?.lastName,
        userDocument?.email,
        userDocument?.age,
        userDocument.isAdmin,
        userDocument.role,
        userDocument?.password,
    );
  }

  async getOneByEmail(email)
  {
    const userDocument = await userModel.findOne({ email });

    return new User (
        userDocument?._id,
        userDocument?.firstName,
        userDocument?.lastName,
        userDocument?.email,
        userDocument?.age,
        userDocument?.isAdmin,
        userDocument.role,
        userDocument?.password,
    );
  }

  async create(data)
  {
    const userDocument = await userModel.create(data);

    return new User (
        userDocument._id,
        userDocument.firstName,
        userDocument.lastName,
        userDocument.email,
        userDocument.age,
        userDocument.password,
        userDocument?.isAdmin,
        //role: null,
    );
  }

  async updateOne(id, data)
  {
    const userDocument = await userModel.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!userDocument)
    {
      throw new Error('User dont exist.');
    }

    return new User (
        userDocument._id,
        userDocument.firstName,
        userDocument.lastName,
        userDocument.email,
        userDocument.age,
        userDocument?.isAdmin
    );
  }

  async deleteOne(id)
  {
    return userModel.deleteOne({ _id: id });
  }
}

export default UserMongooseRepository;