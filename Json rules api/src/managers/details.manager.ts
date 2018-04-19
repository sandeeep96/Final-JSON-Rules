import { Response } from 'express';
import * as mysql from 'mysql';
import { SelectQuery } from '../helpers/queries/select.queries';
import { FieldsQuery } from '../helpers/queries/fields.queries';
import { SQLHelper } from '../helpers/sql.helper';
import { RuleManager } from '../helpers/rules/rule.manager';

import { each, find } from 'lodash';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Rule } from '../models/rules.model';

export class DetailsManager {
    private sqlHelper = new SQLHelper();
    private ruleManager = new RuleManager();

    constructor() { }

    /* 
     * Get the default data for the default rule.
     */
    public getDefaultData() {
        return new Promise((resolve, reject) => {
            this.ruleManager.getDataAndApplyRule(SelectQuery.getDefaultData)
                .then((results) => resolve(results))
                .catch((error) => reject(error));
        });
    }

    /* 
     * Get the list of columns for the 5 tables.
     */
    public getAllColumns(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sqlHelper.executeQuery(SelectQuery.getAllColumnsOfAllTables)
                .then((response: Array<any>) => {
                    const data = {
                        of_coid: response[0],
                        of_details: response[1],
                        of_factorycal: response[2],
                        of_masterdata: response[3],
                        of_variables: response[4]
                    }
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    /* 
     * Fetch the list of tables from DB and prepare response with only the table names to which the rules can be applied.
     */
    public getAllTables(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sqlHelper.executeQuery(SelectQuery.getAllTables)
                .then((response: Array<any>) => {
                    let tableNames: Array<any> = [];
                    response.forEach(obj => {
                        if (obj.Tables_in_oflowdb !== 'expression' && obj.Tables_in_oflowdb !== 'rule') {
                            tableNames.push({
                                Description: obj.Tables_in_oflowdb
                            });
                        }
                    });
                    const data = {
                        Tables: tableNames
                    };
                    resolve(data);
                })
                .catch(err => reject(err));
        });
    }

    /* 
     * Create a new Rule using the data received from the payload.
     */
    public createNewRule(data): Promise<any> {
        return new Promise((resolve, reject) => {
            let queryString = SelectQuery.createRule;
            each(data.rules, (rule) => {
                const newQuery = this.sqlHelper.formatQuery(queryString, this.addParams(data.ruleName, data.ruleResult, rule));
                this.sqlHelper.executeQuery(newQuery)
                    .then(results => {
                        resolve(results)
                    })
                    .catch(error => reject(error));
            });
        });
    }

    /* 
     * Get All rules in the db.
     */
    public getRules(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sqlHelper.executeQuery(SelectQuery.getAllRules)
                .then(results => {
                    let count = 0;
                    let dataSet: Array<Rule> = [];
                    each(results, (item) => {
                        count++;
                        let existingData: Rule = find(dataSet, ['RuleId', item.RuleId]);
                        if (existingData !== undefined) {
                            existingData.Rules.push({
                                ExpId: item.ExpId,
                                TableName: item.TableName,
                                TableField: item.TableField,
                                Operator: item.Operator,
                                OperatorType: item.OperatorType,
                                OperatorValue: item.OperatorValue,
                                FuncParams: item.FuncParams
                            });
                        } else {
                            dataSet.push({
                                RuleId: item.RuleId,
                                RuleName: item.RuleName,
                                Result: item.Result,
                                Rules: [{
                                    ExpId: item.ExpId,
                                    TableName: item.TableName,
                                    TableField: item.TableField,
                                    Operator: item.Operator,
                                    OperatorType: item.OperatorType,
                                    OperatorValue: item.OperatorValue,
                                    FuncParams: item.FuncParams
                                }]
                            });
                        }

                        if (count === results.length) {
                            resolve(dataSet);
                        }

                    });
                })
                .catch(error => reject(error));
        });
    }

    public updateRules(ruleId, data): Promise<any> {
        return new Promise((resolve, reject) => {
            let queryString = SelectQuery.updateRule;
            each(data.rules, (rule) => {
                const newQuery = this.sqlHelper.formatQuery(queryString, this.addParams(data.ruleName, data.ruleResult, rule, ruleId));
                this.sqlHelper.executeQuery(newQuery)
                    .then(result => {
                            resolve(result);
                    })
                    .catch(error => reject(error));
            });
        });
    }

    private addParams(ruleName, ruleResult, rule, ruleId?): Array<any> {
        let params: Array<any> = [];
        if (ruleId) {
            params.push(ruleId);
        }
        params.push(ruleName);
        params.push(ruleResult);
        params.push('null');
        each(rule, (value) => {
            params.push(value);
        });
        return params;
    }
}