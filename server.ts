import fastify from 'fastify';
import { z, ZodError } from 'zod';
import fastifyWS from 'fastify-websocket';

const User = z.object({
	name: z.string().email('NOT EMAIL'),
});

const app = fastify({ logger: true, disableRequestLogging: true });

app.register(fastifyWS);

app.get('/', { websocket: true }, (connection) => {
	connection.socket.on('message', (message) => {
		console.log(message.toString());
		connection.socket.send('hi from wildcard route');
	});
});

app.post('/', async (request, reply) => {
	try {
		const data = User.parse(request.body);
		console.log(data);
	} catch (e) {
		if (e instanceof ZodError) {
			console.log(e.flatten());
		}
	}

	return { hello: 'world' };
});

try {
	await app.listen(3001);
} catch (err) {
	app.log.error(err);
	process.exit(1);
}
