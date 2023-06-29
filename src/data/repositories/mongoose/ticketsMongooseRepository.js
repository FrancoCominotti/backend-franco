import ticketModel from "../../models/mongoose/ticketModel.js";
import Ticket from "../../../domain/entities/ticket.js";

class TicketsMongooseRepository
{
    async find() {
        const ticketsDocument = await ticketModel.find();
    
        const ticket = ticketsDocument.map((document) => new Ticket({
          id: document._id,
          code: document.code,
          purchase_datetime: document.purchase_datetime,
          amount: document.amount,
          purchaser: document.purchaser,

        }));
    
        return {
          ticket
        };
      }

      async getOne(id) {
        const ticketsDocument = await ticketModel.findOne({ _id: id });
    
        if (!ticketsDocument) {
          throw new Error("Ticket Not Found");
        }
    
        return new Ticket(
          ticketsDocument._id,
          ticketsDocument.code,
          ticketsDocument.purchase_datetime,
          ticketsDocument.amount,
          ticketsDocument.purchaser
        );
      }

      
  async create(data) {
    const ticketsDocument  = await ticketModel.create(data);

    return new Ticket(
      ticketsDocument._id,
      ticketsDocument.code,
      ticketsDocument.purchase_datetime,
      ticketsDocument.amount,
      ticketsDocument.purchaser
    );
  }

  async updateOne(id, data) {
    const ticketDocument = await ticketModel.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!ticketDocument) {
      throw new Error("Ticket Not Found");
    }

    return new Ticket(
        ticketDocument._id,
        ticketDocument.code,
        ticketDocument.purchase_datetime,
        ticketDocument.amount,
        ticketDocument.purchaser
    );
  }

  async deleteOne(id) {
    const ticketDocument = await ticketModel.findOne({ _id: id });

    if (!ticketDocument) {
      throw new Error("Ticket Not Found");
    }

    return ticketModel.deleteOne({ _id: id });
  }
}

export default TicketsMongooseRepository;