import * as mysql from 'mysql';
import { appState } from '../app.state';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { resolve } from 'path';
import { FieldsQuery } from './queries/fields.queries';

export class SQLHelper {

    private results: Array<any>;
    private params: any;

    constructor() {
    }

    /* 
     * Execute the query and return -> error, results, fields
     */
    public executeQuery(query: string, options?: mysql.QueryOptions, params?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            appState.connection.query(query, (error: mysql.MysqlError, results: any, fields: mysql.FieldInfo) => {
                if (error) {
                    // console.log('Error: ', error);
                    reject(error);
                }
                resolve(results);
            });
        });
    }

    /* 
     * Format the query if any parameters are to be added to it.
     */
    public formatQuery(query: string, params: string[]): string {
        let theString = arguments[0];
        if (arguments.length !== 2) {
            return theString;
        }

        let theParams = arguments[1];
        for (let i = 0; i < theParams.length; i++) {
            if (theParams[i] !== undefined && theParams[i] !== null) {
                let regEx = new RegExp("\\{" + i + "\\}", "gm");
                theString = theString.replace(regEx, theParams[i]);
            }
        }
        return theString;
    }

    /* 
     * Add the parameter to the object of parameters
     */
    public addInputParameter(paramName: string, value: any) {
        if (this.params == null) {
            this.params = {};
        }
        this.params[paramName] = {
            val: value
        };
    }

}