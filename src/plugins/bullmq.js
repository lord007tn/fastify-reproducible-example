import fs from "fs-extra";
import fp from "fastify-plugin";
import {  Queue, Worker } from "bullmq";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dir = join(__dirname, "../workers");

/**
 * Add bullMQ queues and instantiate workers
 */
async function fastifyBullMQ(fastify, options) {
  const { redis } = fastify;
  const queues = {};
  const workers = {};
  const list = await fs.readdir(dir, { withFileTypes: false });

  await Promise.all(
    list.map(async (file) => {
      const { worker, queueConfig, workerConfig } = await import(
        "file://" + resolve(dir, file)
      );

      queues[queueConfig.name] = new Queue(queueConfig.name, {
        ...queueConfig.options,
        connection: redis,
      });
      queues[queueConfig.name].on("error", (err) => {
        fastify.log.error(err);
      });

      fastify.log.info(`The ${queueConfig.name} Queue Created`);

      if (!worker) {
        fastify.log.warn(
          `The ${queueConfig.name} Queue does not have a worker function`
        );
      } else {
        workers[queueConfig.name] = new Worker(
          queueConfig.name,
          (job) => worker(fastify, job),
          {
            ...workerConfig,
            connection: redis,
          }
        );
        workers[queueConfig.name].on("error", (err) => {
          fastify.log.error(err);
        });
        workers[queueConfig.name].on("failed", (job, err) => {
          fastify.log.error(
            `${job?.id} in Worker ${queueConfig.name} has failed with ${err.message}`
          );
        });

        fastify.log.info(`The ${queueConfig.name} Worker Created`);
      }
    })
  );

  fastify.decorate("queues", queues);
  fastify.decorate("workers", workers);
}
export default fp(fastifyBullMQ, {
  name: "bullmq",
  dependencies: ["redis", "fastify-env"],
});
export const autoConfig = { dir: join(__dirname, "../workers") };
