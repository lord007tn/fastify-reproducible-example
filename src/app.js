import { join, dirname } from "path";
import AutoLoad from "@fastify/autoload";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = async (fastify, opts) => {
  // Place here your custom code!

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify
    .register(AutoLoad, {
      dir: join(__dirname, "plugins"),
      options: Object.assign({ prefix: "/plugins" }, opts),
      dirNameRoutePrefix: false,
      forceESM: true,
    })
    .ready((err) => {
      if (err) throw err;
      fastify.log.info("Plugins loaded");
    });

  fastify
    .register(AutoLoad, {
      dir: join(__dirname, "routes"),
      options: Object.assign({ prefix: "/api" }, opts),
      routeParams: true,
      autoHooks: true,
      cascadeHooks: true,
      forceESM: true,
    })
    .ready((err) => {
      if (err) throw err;
      fastify.log.info("Routes loaded");
    });
};

export default app;
export { app };
