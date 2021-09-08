require('dotenv').config();

import http from 'http';
import app from './api/app';

const port: number = Number(process.env.PORT) || 3000;
const host: string = process.env.HOST || 'localhost';

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}`);
});
