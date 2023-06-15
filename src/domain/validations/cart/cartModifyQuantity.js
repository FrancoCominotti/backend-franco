import z from 'zod';

const cartModifyQuantityValidation = z.object({
      pid: z.string().length(24),
      cid: z.string().length(24),
      quantity: z.number(),
});


export default cartModifyQuantityValidation;