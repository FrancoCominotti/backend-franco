
import {nanoid} from "nanoid";

export function generateTicketCode() {
  // Genera un código único utilizando nanoid con una longitud de 8 caracteres
  const code = nanoid(8);
  return code;
}
