import z from 'zod';


const productCreateValidation = z.object({
  title: z.string().min(1).max(35),
  description: z.string().min(10).max(35),
  price: z.number(),
  category: z.string().min(1).max(35),
  code:z.string().min(6).max(15),
  stock:z.number()
});

export default productCreateValidation;