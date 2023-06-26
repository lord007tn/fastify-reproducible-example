import fp from "fastify-plugin";
import swagger from "@fastify/swagger";

/**
 * A Fastify plugin for serving Swagger (OpenAPI v2) or OpenAPI v3 schemas
 *
 * @see https://github.com/fastify/fastify-swagger
 */
export default fp(
	async (fastify) => {
		fastify.register(swagger, {
			openapi: {
				info: {
					title: "Joodcms swagger",
					description: "testing the fastify swagger api",
					version: "0.1.0",
				},
				servers: [
					{
						url: "http://localhost:8000",
					},
					{
						url: "https://joodcms-api.joodbooking.com",
					},
				],
				components: {
					securitySchemes: {
						apiKey: {
							type: "apiKey",
							name: "Authorization",
							in: "header",
						},
					},
				},
			},
			hideUntagged: true,
		});
	},
	{
		name: "swagger",
	}
);
