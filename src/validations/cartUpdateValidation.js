import z from 'zod';

const cartUpdateValidation = z.object({
  id: z.string().max(24),
  products: z.array(
    z.object({
      _id: z.string().max(24),
      quantity: z.number(),
    })
  ),
});


export default cartUpdateValidation;