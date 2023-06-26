export const worker = async (fastify, job) => {
  const { config } = fastify;
  switch (job.name) {
    default:
      break;
  }
};

export const queueConfig = {
  name: "SITE",
  options: {
    defaultJobOptions: {
      removeOnComplete: {
        age: 3600, // keep up to 1 hour
      },
      removeOnFail: {
        count: 1000,
        age: 24 * 3600, // keep up to 24 hours
      },
    },
  },
};

export const workerConfig = {
  // connection would override default connection defined in plugin options
};
