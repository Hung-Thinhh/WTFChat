import { createClient } from 'redis';

const redisClient = createClient({
    password: 'qgmcRli0moFhKIV59AJPijzoSCLGo6gf',
    socket: {
        host: 'redis-13202.c295.ap-southeast-1-1.ec2.redns.redis-cloud.com',
        port: 13202,
    },
});

//check for connection
redisClient.on('connect', function () {
    console.log('Kết nối thành Redis công');
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.connect();

export default redisClient;
