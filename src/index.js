//@ts-ignore
import { restartable } from "@fastify/restartable";
import closeWithGrace from "close-with-grace";

import ajvFormat from "ajv-formats";
import { ajvFilePlugin } from "./utils/ajv-plugins.js";

async function createServerApp(fastify, opts) {
  const app = fastify(opts);

  await app.register(import("./app.js")).ready((err) => {
    if (err) throw err;
    app.log.info("App ready");
  });

  return app;
}
//@ts-ignore
const app = await restartable(createServerApp, {
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  pluginTimeout: 20000,
  ajv: {
    customOptions: {
      allowUnionTypes: true,
    },
    plugins: [ajvFormat, ajvFilePlugin],
  },
});

const closeListeners = closeWithGrace(
  {
    // delay is the number of milliseconds for the graceful close to finish
    delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY) || 500,
  },
  async function ({ signal, err, manual }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  }
);
app.addHook("onClose", async (_instance, done) => {
  closeListeners.uninstall();
  done();
});
//server listen

const port = process.env.PORT || 8000;
app.listen({ host: "127.0.0.1", port: parseInt(port) }, async (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
