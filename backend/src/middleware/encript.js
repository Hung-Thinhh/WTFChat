require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;

export const decryptData = async (req, res, next) => {
    if (req.method === 'POST' && req.body.encryptedData) {
        try {
            const encryptedData = req.body.encryptedData;
            // Decrypt the data using the private key
            const decryptedData = crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                },
                Buffer.from(encryptedData, 'base64'), // Convert from base64 to buffer
            );

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
