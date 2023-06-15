import z from 'zod';

const idValidationCartProduct = z.object({
    cid: z.string().length(24),
    pid:z.string().length(24)
  });
  
  export default idValidationCartProduct