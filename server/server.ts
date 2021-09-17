import dotenv from 'dotenv';
import http, { Server } from 'http';
import app from './api/app';

dotenv.config();

const port: number = Number(process.env.PORT) || 3000;
const host: string = process.env.HOST || 'localhost';

const server: Server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server started on ${host}:${port}`);
});
