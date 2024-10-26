require('dotenv').config();
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

const privateKey = process.env.PRIVATE_KEY;

const decrypt = (receiverSecretKey, encryptedData) => {
    const receiverSecretKeyUint8Array = util.decodeBase64(receiverSecretKey);
    const nonce = util.decodeBase64(encryptedData.nonce);
    const ciphertext = util.decodeBase64(encryptedData.ciphertext);
    const ephemPubKey = util.decodeBase64(encryptedData.ephemPubKey);
    const decryptedMessage = nacl.box.open(
        ciphertext,
        nonce,
        ephemPubKey,
        receiverSecretKeyUint8Array,
    );
    return util.encodeUTF8(decryptedMessage);
};

export const decryptData = async (req, res, next) => {
    if (req.method === 'POST' && req.body.encryptedData) {
        try {
            const encryptedData = req.body.encryptedData;
            // Decrypt the data using the private key
            const decryptedData = decrypt(privateKey, encryptedData)

            req.body = JSON.parse(decryptedData.toString()); // Parse the decrypted data
            next(); // Continue processing the request
        } catch (error) {
            // Handle decryption errors (e.g., log the error)
            console.error('MIDDLEWARE | ENCRYPT | ERROR', error);
            return res.status(500).json({
                EM: 'ENCRYPT | ERROR | ' + error,
                EC: '500',
            });
        }
    } else {
        next(); // Skip middleware if not a POST request or no encrypted data
    }
};
