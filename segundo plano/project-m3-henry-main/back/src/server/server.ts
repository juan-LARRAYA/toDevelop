import express from 'express';
import morgan from 'morgan';
import routerIndex from '../routes';
import cors from 'cors';

const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(routerIndex);

export default server;
