import dotenv from 'dotenv';
import pkg from 'jsonwebtoken';

dotenv.config();

const {verify, sign, decode} = pkg;
const {JWT_EXPIRE_IN_HRS, JWT_KEY} = process.env

export const generateToken = userId  =>{
    const token = sign({id:userId},JWT_KEY,{expiresIn:JWT_EXPIRE_IN_HRS,});
    return token;
}

export const verifyToken = token => verify(token, JWT_KEY);

export const decodeToken = token => decode(token, JWT_KEY);