require('dotenv').config();

const encrypt = (message) => {
    const bufferMessage = Buffer.from(message, 'utf8');

    return crypto.publicEncrypt(process.env.PUBLIC_KEY, bufferMessage);
};

const decrypt = (encryptedMessage) => {
    return crypto.privateDecrypt(process.env.PRIVATE_KEY, encryptedMessage);
};

export const decryptData = async (req, res, next) => {
    const encryptedMessage = await req.body.toString();
    console.log(encryptedMessage);
    
    if (!encryptedMessage) next();

    res.body = decrypt(encryptedMessage);
    next();
};
