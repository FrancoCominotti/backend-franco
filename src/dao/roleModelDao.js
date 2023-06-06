import roleModel from '../models/roleModels.js'

class RoleMongooseDao
{
  async paginate(criteria)
  {
    const { limit, page } = criteria;
    const roleDocuments = await roleModel.paginate({}, { limit, page });

    roleDocuments.docs = roleDocuments.docs.map(document => ({
      id: document._id,
      name: document.name,
      permissions: document.permissions
    }));

    return roleDocuments;
  }

  async getOne(id)
  {
    const roleDocument = await roleModel.findOne({ _id: id });

    if(!roleDocument)
    {
      throw new Error('Role dont exist.');
    }

    return {
        id: roleDocument?._id,
        name: roleDocument?.name,
        permissions: roleDocument?.permissions
    }
  }

  async create(data)
  {
    const roleDocument = await roleModel.create(data);

    return {
        id: roleDocument._id,
        name: roleDocument.name,
        permissions: roleDocument.permissions
    }
  }

  async updateOne(id, data)
  {
    const roleDocument = await roleModel.findOneAndUpdate({ _id: id }, data, { new: true});

    if(!roleDocument)
    {
      throw new Error('Role dont exist.');
    }

    return {
        id: roleDocument._id,
        name: roleDocument.name,
        permissions: roleDocument.permissions
    }
  }

  async deleteOne(id)
  {
    return roleModel.deleteOne({ _id: id });
  }
}

export default RoleMongooseDao;