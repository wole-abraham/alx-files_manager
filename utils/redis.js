import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => console.log(err));
    this.client.connect();
  }

  isAlive() {
    return this.client.isReady;
  }

  async get(key) {
    return this.client.get(key);
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
