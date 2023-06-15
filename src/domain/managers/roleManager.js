import RoleMongooseRepository from "../../data/repositories/mongoose/roleMongooseRepository.js";
import idValidation from "../validations/share/idValidation.js";

import roleCreateValidation from '../validations/roles/roleCreateValidation.js';
import roleUpdateValidation from '../validations/roles/roleUpdateValidation.js'

import container from "../../container.js";

class RoleManager
{
  constructor()
  {
    this.roleRepository = container.resolve('RoleRepository');
  }

  async paginate(criteria)
  {
    return this.roleRepository.paginate(criteria);
  }

  async getOne(id)
  {
    await idValidation.parseAsync({ id });
    return this.roleRepository.getOne(id);
  }

  async create(data)
  {
    await roleCreateValidation.parseAsync(data)
    return await this.roleRepository.create(data);
  }

  async updateOne(id, data)
  {
    await roleUpdateValidation.parseAsync({...data,id})
    return this.roleRepository.updateOne(id, data);
  }

  async deleteOne(id)
  {
    await idValidation.parseAsync({ id });
    return this.roleRepository.deleteOne(id);
  }
}

export default RoleManager;