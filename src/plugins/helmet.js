import fp from "fastify-plugin";
import helmet from "@fastify/helmet";

/**
 * Important security headers for Fastify. It is a tiny wrapper around helmet.
 *
 * @see https://github.com/fastify/fastify-helmet
 */
export default fp(
	async (fastify) => {
		fastify.register(helmet, (instance) => {
			return {
				contentSecurityPolicy: false,
				frameguard: false,
			};
		});
	},
	{
		name: "helmet",
		dependencies: ["swagger", "swagger-ui"],
	}
);
