//import UserMongooseDao from "../../data/dao/userMongooseDao.js";
import idValidation from "../validations/share/idValidation.js";

import userCreateValidation from '../validations/users/userCreateValidation.js'
import userUpdateValidation from '../validations/users/userUpdateValidation.js'

import container from "../../container.js";

class UserManager
{
  constructor()
  {
     this.userRepository = container.resolve('UserRepository')
  }

  async paginate(criteria)
  {
    return this.userRepository.paginate(criteria);
  }

  async getOneByEmail(email)
  {
    return this.userRepository.getOneByEmail(email);
  }

  async getOne(id)
  {
    await idValidation.parseAsync({ id });
    return this.userRepository.getOne(id);
  }

  async create(data)
  {
    await userCreateValidation.parseAsync(data)
    
    const user = await this.userRepository.create(data);

    return { ...user, password: undefined };
  }

  async updateOne(id, data)
  {
    await userUpdateValidation.parseAsync({ ...data, id });
    return this.userRepository.updateOne(id, data);
  }

  // async addCart(id, data)
  // {
  //   return this.userRepository.addCart(id, data);
  // }

  async deleteOne(id)
  {
    await idValidation.parseAsync({ id });
    return this.userRepository.deleteOne(id);
  }

  async forgetPassword(dto)
  {
    const user = await this.userRepository.getOneByEmail(dto.email);
    user.password = dto.password;

    return this.userRepository.updateOne(user.id, user);
  }
}

export default UserManager;