import fp from "fastify-plugin";
import multipart from "@fastify/multipart";

/**
 * Fastify plugin to parse the multipart content-type.
 *
 * @see https://github.com/fastify/fastify-multipart
 */
export default fp(
	async (fastify) => {
		fastify.register(multipart, {
			attachFieldsToBody: true,
		});
	},
	{
		name: "multipart",
	}
);
