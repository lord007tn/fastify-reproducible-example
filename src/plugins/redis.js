import fp from "fastify-plugin";
import redis from "@fastify/redis";
/**
 * Fastify Redis connection plugin; with this you can share the same Redis connection in every part of your server.
 *
 * @see https://github.com/fastify/fastify-redis
 */
export default fp(
  async (fastify) => {
    const { config } = fastify;
    fastify.register(redis, {
      host: config.REDIS_HOST,
      port: parseInt(config.REDIS_PORT),
      maxRetriesPerRequest: null,
    });
  },
  {
    name: "redis",
    dependencies: ["fastify-env"],
  }
);
