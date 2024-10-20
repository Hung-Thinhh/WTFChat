// const crypto = require("crypto");
// const fs = require("fs");

// function genKeyPair() {
//   // Generates an object where the keys are stored in properties `privateKey` and `publicKey`
//   const keyPair = crypto.generateKeyPairSync("rsa", {
//     modulusLength: 4096, // bits - standard for RSA keys
//     publicKeyEncoding: {
//       type: "pkcs1", // "Public Key Cryptography Standards 1"
//       format: "pem", // Most common formatting choice
//     },
//     privateKeyEncoding: {
//       type: "pkcs1", // "Public Key Cryptography Standards 1"
//       format: "pem", // Most common formatting choice
//     },
//   });

//   // Create the public key file
//   fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey);

//   // Create the private key file
//   fs.writeFileSync(__dirname + "/id_rsa_priv.pem", keyPair.privateKey);
// }

// // Generates the keypair
// genKeyPair();

const nacl = require("tweetnacl")
const util = require("tweetnacl-util") 

const genKeyPair = () => {

    const keypair = nacl.box.keyPair()
    const receiverPublicKey = util.encodeBase64(keypair.publicKey)
    const receiverSecretKey = util.encodeBase64(keypair.secretKey)

    console.log("Public: "  + receiverPublicKey);
    console.log("Private: "  + receiverSecretKey);
}

genKeyPair();
