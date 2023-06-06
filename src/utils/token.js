
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const PrivateKey = 'CoderTokenFP';


export const createHash = (data, salt) => {
    if (!data || !salt) {
      throw new Error('Data and salt arguments are required.');
    }
  
    const hash = bcrypt.hashSync(data, salt);
    return hash;
  };


export const isValidPassword = async (password, passwordHash) =>
{
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) =>
{
    return await jwt.sign({ user: { ...user, password: undefined } }, process.env.PRIVATE_KEY, { expiresIn: '1m' });
}