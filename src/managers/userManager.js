import UserMongooseDao from "../dao/userModelDao.js";
import idValidation from '../validations/share/idValidation.js';
import userCreateValidation from '../validations/users/userCreateValidation.js'
import userUpdateValidation from '../validations/users/userUpdateValidation.js'

class UserManager
{
  constructor()
  {
     this.userDao = new UserMongooseDao();
  }

  async paginate(criteria)
  {
    return this.userDao.paginate(criteria);
  }

  async getOneByEmail(email)
  {
    return this.userDao.getOneByEmail(email);
  }

  async getOne(id)
  {
    await idValidation.parseAsync({ id });
    return this.userDao.getOne(id);
  }

  async create(data)
  {
    await userCreateValidation.parseAsync(data)
    
    const user = await this.userDao.create(data);

    return { ...user, password: undefined };
  }

  async updateOne(id, data)
  {
    await userUpdateValidation.parseAsync({ ...data, id });
    return this.userDao.updateOne(id, data);
  }

  async addCart(id, data)
  {
    return this.userDao.addCart(id, data);
  }

  async deleteOne(id)
  {
    await idValidation.parseAsync({ id });
    return this.userDao.deleteOne(id);
  }

  async forgetPassword(dto)
  {
    const user = await this.userDao.getOneByEmail(dto.email);
    user.password = dto.password;

    return this.userDao.updateOne(user.id, user);
  }
}

export default UserManager;