require('dotenv').config();

import http from 'http';
import app from './api/app';

const port: number = Number(process.env.PORT)!;
const host: string = process.env.HOST!;

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Server started on ${host}:${port}`);
});
