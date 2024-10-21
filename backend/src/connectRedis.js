import { createClient } from 'redis';

const redisClient = createClient({
    host: '::1',
    port: 6379,
});

export const connectToRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis Client Is Connected!');
    } catch (err) {
        console.error('Redis Client Error:', err);
        throw err; // Re-throw the error to be handled by the caller
    }
};

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('disconnect', () => {
    console.log('Redis Client Disconnected!');
});
