import * as express from 'express';
import * as bodyparser from 'body-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as path from 'path';

import { MySQLConnection } from './connect';
import { NodeServerConfig } from './server/server';

import { appState } from './app.state';

const app: express.Express = express();
const sqlConnection = new MySQLConnection();
const nodeServer = new NodeServerConfig();

let sqlConnected = false;
dotenv.load({ path: '.env' });

const port = process.env.NODE_SERVER_PORT || 3000;

// Node Server
nodeServer.initializeNodeServerConfig(app, port);

// SQL Connection Establishment
sqlConnection.loadConnectionSettings();

// If SQL Connection established, start node server
sqlConnection.getConnection().then(() => {
    nodeServer.ShowConnectionStatus(app, port);
}).catch((err) => {
    console.log('Error occurred while connecting to DB', err);
});
