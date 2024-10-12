require('dotenv').config();

const encrypt = (message) => {
    const bufferMessage = Buffer.from(message, 'utf8');

    return crypto.publicEncrypt(process.env.PUBLIC_KEY, bufferMessage);
};

const decrypt = (encryptedMessage) => {
    return crypto.privateDecrypt(process.env.PRIVATE_KEY, encryptedMessage);
};

export const decryptData = async (req, res, next) => {
    var send = res.send;
    res.send = function (string) {
        var body = string instanceof Buffer ? string.toString() : string;
        body = body.replace(/<\/body>/, function (w) {
            return 'foo' + w;
        });

        if (string instanceof Buffer) {
            this.body = new Buffer(body);
        } else {
            this.body = body;
        }

        send.call(this);
    };
    next();
};
