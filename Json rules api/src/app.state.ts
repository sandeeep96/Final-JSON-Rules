import * as mysql from 'mysql';

const connection: mysql.Connection = null;

let appState = {
    connection
};

export { appState };