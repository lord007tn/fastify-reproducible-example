const root = async (fastify, opts) => {
  fastify.get("/", async function (request, reply) {
    return reply.status(200).send("OK");
  });
  fastify.post(
    "/file",
    {
      schema: {
        tags: ["media"],
        consumes: ["multipart/form-data"],
        required: ["media"],
        body: {
          type: "object",
          properties: {
            media: {
              anyOf: [
                {
                  type: "array",
                  items: {
                    isFile: true,
                  },
                },
                { isFile: true },
              ],
            },
          },
        },
        response: {
          "2xx": {
            description: "Successful response",
            properties: {
              status: { type: "number" },
              message: { type: "string" },
            },
          },
          "4xx": {
            type: "object",
            properties: {
              status: { type: "number" },
              message: { type: "string" },
            },
          },
          500: {
            description: "Error response",
            type: "object",
            properties: {
              status: { type: "number", default: 500 },
              message: { type: "string" },
            },
          },
        },
      },
    },
    async function (request, reply) {
      return reply.status(200).send("OK");
    }
  );
  fastify.get("/restart", async function (request, reply) {
    await fastify.restart();
    return reply.status(200).send("OK");
  });
};

export default root;
