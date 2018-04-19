import * as mysql from 'mysql';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { appState } from './app.state';

dotenv.load({ path: '.env' });


export class MySQLConnection {

    constructor() { }

    public loadConnectionSettings() {
        appState.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
    }

    public getConnection(): Promise<any> {
        appState.connection.connect((err) => {
            if (err) {
                return Promise.reject(err.stack);
            }
            console.log('Connected as ID:', appState.connection.threadId);
        });

        // console.log('Connected as ID:', this.connection.threadId);
        return Promise.resolve(true);

    }

    public disconnect(): Promise<boolean> {
        appState.connection.end((err) => {
            if (err) {
                console.error('Error Disconnecting:', err.stack);
                return Promise.reject(false);
            }

            console.log('Connection is terminated now!!');
            return Promise.resolve(true);
        });

        return Promise.reject(false);
    }
}

