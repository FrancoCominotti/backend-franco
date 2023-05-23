import z from 'zod';

const idValidationCartProduct = z.object({
    cid: z.string().max(24),
    pid:z.string().max(24)
  });
  
  export default idValidationCartProduct