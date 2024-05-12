import fastify from 'fastify';
import { z, ZodError } from 'zod';
import fastifyWS from '@fastify/websocket';

import { logHey } from './util';

const User = z.object({
    name: z.string().email('NOT EMAIL'),
});

const app = fastify({ logger: true });

await app.register(fastifyWS);

app.get('/', { websocket: true }, (connection) => {
    connection.socket.on('message', (message) => {
        console.log(message.toString());
        connection.socket.send('hi from wildcard route');
    });
});

app.post('/', async (request) => {
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
    logHey();
    await app.listen({ port: 3001 });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
