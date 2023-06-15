import z from 'zod';

const cartUpdateValidation = z.object({
      id: z.string().length(24),
      quantity: z.number(),
});


export default cartUpdateValidation;