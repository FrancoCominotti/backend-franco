import bcrypt from 'bcrypt'


//*****Hassheo ******/

export const createHash = async password =>bcrypt.hashSync(password,bcrypt.genSaltSync(10));