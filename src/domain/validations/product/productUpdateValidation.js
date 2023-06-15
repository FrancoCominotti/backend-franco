import z from 'zod';
import idValidation from '../share/idValidation.js';
import productCreateValidation from './productCreateValidation.js';

const productUpdateValidation = z.union([
  idValidation,
  productCreateValidation
]);

export default productUpdateValidation;