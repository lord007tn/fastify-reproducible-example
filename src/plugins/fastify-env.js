import path from "path";
import fp from "fastify-plugin";
import Env from "@fastify/env";
import S from "fluent-json-schema";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * It's very common to pass secrets and configuration
 * to your application via environment variables.
 * The `fastify-env` plugin will expose those configuration
 * under `fastify.config` and validate those at startup.
 *
 * @see https://github.com/fastify/fastify-env
 */
const selectEnvFile = (node_env) => {
	switch (node_env) {
		case "development":
			return path.join(__dirname, "../../", ".env.development");
		case "production":
			return path.join(__dirname, "../../", ".env.production");
		case "test":
			return path.join(__dirname, "../../", ".env.test");
		default:
			return path.join(__dirname, "../../", ".env");
	}
};

export default fp(
	async (fastify) => {
		await fastify.register(Env, {
			schema: S.object()
				.prop("PORT", S.string().required())
				.prop("REDIS_HOST", S.string().required())
				.prop("REDIS_PORT", S.string().required())
				.valueOf(),
			dotenv: {
				path: selectEnvFile(process.env.NODE_ENV),
				debug: process.env.NODE_ENV === "development",
			},
		});
	},
	{
		name: "fastify-env",
	}
);
