import fp from "fastify-plugin";
import swaggerUI from "@fastify/swagger-ui";

/**
 * A Fastify plugin for serving Swagger UI.
 *
 * @see https://github.com/fastify/fastify-swagger-ui
 */
export default fp(
	async (fastify) => {
		fastify.register(swaggerUI, {
			routePrefix: "/docs",

			uiConfig: {
				docExpansion: "none",
				deepLinking: false,
			},
		});
	},
	{
		name: "swagger-ui",
		dependencies: ["swagger"],
	}
);
