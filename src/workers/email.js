export const worker = async (fastify, job) => {
  switch (job.name) {
    default:
      break;
  }
};

export const queueConfig = {
  name: "EMAIL",
  options: {
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: {
        age: 24 * 3600, // keep up to 24 hours
      },
    },
  },
};

export const workerConfig = {
  // connection would override default connection defined in plugin options
};
