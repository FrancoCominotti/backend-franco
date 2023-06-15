import bcrypt from 'bcrypt'


//*****Hassheo ******/

//export const createHash = async password =>bcrypt.hashSync(password,bcrypt.genSaltSync(10));

export const createHash = (data) => {
    const salt = bcrypt.genSaltSync(10); // Generar un salt seguro
    const hash = bcrypt.hashSync(data, salt); // Generar el hash utilizando la contraseña y el salt
    return hash;
  };
