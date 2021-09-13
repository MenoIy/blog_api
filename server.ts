import dotenv from 'dotenv';
import http, { Server } from 'http';
import app from './api/app';

dotenv.config();

const port: number = Number(process.env.PORT)!;
const host: string = process.env.HOST!;

const server: Server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Server started on ${host}:${port}`);
});
