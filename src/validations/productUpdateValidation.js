import z from 'zod';

const productUpdateValidation = z.object({
  id: z.string().max(24),
  title: z.string().min(1).max(35),
  description: z.string().min(10).max(35),
  price: z.number(),
  category: z.string().min(1).max(35),
  code:z.string().min(6).max(15),
  stock:z.number()
});

export default productUpdateValidation;