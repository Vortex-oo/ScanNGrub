import jwt from 'jsonwebtoken';
import crypto from 'crypto';


function createToken(userId, email, password) {
    const payload = {
        userId: userId,
        email: email,
        password: password
    };

    const secretKey = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secretKey, options);
}


const verifyToken= async(token)=>{

    try {

        if(!token){
            return false
        }
        const decoded = jwt.verify(token, crypto.randomBytes(32).toString('hex'));
        return decoded;

    } catch (error) {
        return false;
    }
}

export {createToken, verifyToken};