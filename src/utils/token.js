
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const PrivateKey = 'CoderTokenFP';

export const isValidPassword = async (password, passwordHash) =>
{
    return await bcrypt.compare(password, passwordHash);
}

export const generateToken = async (user) =>
{
    return await jwt.sign({ user: { ...user, password: undefined } }, PrivateKey, { expiresIn: '1m' });
}