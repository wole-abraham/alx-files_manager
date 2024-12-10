import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
  }

  funcisAlive() {
    return this.client.isReady;
  }

  async get(key) {
    const value = await this.client.get(key);
    return value;
  }

  async set(key, value, time) {
    this.client.set(key, value, { EX: time });
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
