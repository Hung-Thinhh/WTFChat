import env from 'react-dotenv';
import axios from 'setup/axios';
import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

export function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function getAge(birthDateString) {
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// encrypt data befour send them
const publicKey = env.PUBLIC_KEY;

const encrypt = (receiverPublicKey, msgParams) => {
    const ephemeralKeyPair = nacl.box.keyPair();
    const pubKeyUInt8Array = util.decodeBase64(receiverPublicKey);
    const msgParamsUInt8Array = util.decodeUTF8(msgParams);
    const nonce = nacl.randomBytes(nacl.box.nonceLength);

    const encryptedMessage = nacl.box(
        msgParamsUInt8Array,
        nonce,
        pubKeyUInt8Array,
        ephemeralKeyPair.secretKey,
    );
    return {
        ciphertext: util.encodeBase64(encryptedMessage),
        ephemPubKey: util.encodeBase64(ephemeralKeyPair.publicKey),
        nonce: util.encodeBase64(nonce),
        version: 'x25519-xsalsa20-poly1305',
    };
};

// only for post
export const postData = (api, data) => {
    if (!publicKey) {
        alert('Public key not loaded yet!');
        return;
    }

    // Encrypt the data using the public key
    var encryptedData = encrypt(publicKey, JSON.stringify(data));

    // Now send the encrypted data using Axios:
    return axios.post(api, { encryptedData });
};
