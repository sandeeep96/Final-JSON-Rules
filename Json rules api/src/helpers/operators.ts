import * as mysql from 'mysql';
import * as moment from 'moment';
import { SQLHelper } from './sql.helper';

export class Operators {

    private sqlHelper = new SQLHelper();

    public Convert(expression: moment.Moment, type: mysql.Types) {
        if (type === mysql.Types.VARCHAR) {
            return expression.format('YYYY-DD-MM');
        }
    }

    public addToDate(value: any): moment.Moment {
        return moment().add(value, 'hour');
    }

}