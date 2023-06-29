import mongoose, { Schema } from 'mongoose';
import paginate from "mongoose-paginate-v2";

const ticketCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
  code: {type: Schema.Types.String, unique: true, required: true},
  purchase_datetime: {type: Schema.Types.Date,default: Date.now},
  amount: {type: Schema.Types.Number,required: true,},
  purchaser: {type: Schema.Types.String,required: true,},
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);


export default ticketModel;