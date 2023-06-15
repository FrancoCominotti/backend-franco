import mongoose from 'mongoose';
import paginate from "mongoose-paginate-v2";

const roleCollection = 'roles';

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissions: [{ type: String }],
});

roleSchema.plugin(paginate);

const roleModel = mongoose.model(roleCollection, roleSchema);

export default roleModel;