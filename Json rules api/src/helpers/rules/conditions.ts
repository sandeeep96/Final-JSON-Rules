import * as mysql from 'mysql';

import { Operators } from '../operators';

export class Conditions {
    private operatorHelper = new Operators();

    public conditions = {
        PNR: {
            all: [
                {
                    fact: 'table-information',
                    operator: 'notEqual',
                    value: '',
                    path: '.PONumber'
                },
                {
                    fact: 'table-information',
                    operator: 'in',
                    value: ['MANC', 'MACM', 'MSPT'],
                    path: '.POStat'
                },
                // {
                //     fact: 'table-information',
                //     operator: 'lessThan',
                //     value: '.TimeZoneAdj',
                //     path: '.ReleaseDate'
                // }
            ]
    
        },
        PNS: {
            all: [
                {
                    fact: 'table-information',
                    operator: 'notEqual',
                    value: '',
                    path: '.PONumber'
                },
                {
                    fact: 'table-information',
                    operator: 'in',
                    value: ['REL'],
                    path: '.POStat'
                },
                // {
                //     fact: 'table-information',
                //     operator: 'lessThan',
                //     value: '.TimeZoneAdj',
                //     path: '.BasicStartDate'
                // }
            ]
        },
        PNC: {
            all: [
                {
                    fact: 'table-information',
                    operator: 'notEqual',
                    value: '',
                    path: '.PONumber'
                },
                {
                    fact: 'table-information',
                    operator: 'in',
                    value: ['PCNF'],
                    path: '.POStat'
                },
                // {
                //     fact: 'table-information',
                //     operator: 'lessThan',
                //     value: '.TimeZoneAdj',
                //     path: '.BasicFinDate'
                // }
            ]
        },
        QNC: {
            all: [
                {
                    fact: 'table-information',
                    operator: 'notEqual',
                    value: '',
                    path: '.PONumber'
                },
            {
                    fact: 'table-information',
                    operator: 'equal',
                    value: '',
                    path: '.UDBatch'
                },
                // {
                //     fact: 'table-information',
                //     operator: 'lessThan',
                //     value: '.TimeZoneAdj',
                //     path: '.MatAvDt'
                // }
            ]
        },
        SDNC: {
            all: [
                {
                    fact: 'table-information',
                    operator: 'equal',
                    value: '',
                    path: '.PONumber'
                },
                {
                    fact: 'table-information',
                    operator: 'equal',
                    value: '',
                    path: '.Delivery'
                },
                // {
                //     fact: 'table-information',
                //     operator: 'lessThan',
                //     value: '.TimeZoneAdj',
                //     path: '.DelivGIDate - .DelCrStockOrd'
                // }
            ]
    
        }
    }
    
    constructor () {
        // this.conditions.PNC.all[2].value = this.operatorHelper.Convert(this.operatorHelper.addToDate(1), mysql.Types.VARCHAR);
        // this.conditions.PNR.all[2].value = this.operatorHelper.Convert(this.operatorHelper.addToDate(1), mysql.Types.VARCHAR);
        // this.conditions.PNS.all[2].value = this.operatorHelper.Convert(this.operatorHelper.addToDate(1), mysql.Types.VARCHAR);
        // this.conditions.QNC.all[2].value = this.operatorHelper.Convert(this.operatorHelper.addToDate(1), mysql.Types.VARCHAR);
        // this.conditions.SDNC.all[2].value = this.operatorHelper.Convert(this.operatorHelper.addToDate(1), mysql.Types.VARCHAR);
    }

}