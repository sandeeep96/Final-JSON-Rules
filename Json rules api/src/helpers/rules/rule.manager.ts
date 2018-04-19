import { Engine, Rule } from 'json-rules-engine';
import { each } from 'lodash';
import * as mysql from 'mysql';

import { SQLHelper } from '../sql.helper';
import { SelectQuery } from '../queries/select.queries';
import { Operators } from '../operators';
import { Conditions } from './conditions';
import { events } from './events';
import { RuleHelper } from './rules.helper';
import { Result } from '../../models/Result.model';

export class RuleManager {
    private results: Array<Result>;
    private conditions = new Conditions();
    private events = events;

    // private engine: Engine = new Engine();
    private sqlHelper = new SQLHelper();
    private operatorHelper = new Operators();

    public getDataAndApplyRule(query: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.sqlHelper.executeQuery(query)
                .then((results: Result[]) => {
                    this.results = results;
                    resolve(this.intializeAndRunEngine());
                })
                .catch(error => reject(error));
        });
    }

    private intializeAndRunEngine(): Promise<Array<Result>> {
        let finalResult: Array<Result> = [];
        return new Promise((resolve, reject) => {

            new Promise((resolve, reject) => {
                let finalIndex = false;
                let newResult: Array<Result> = [];

                this.results.forEach((item: Result, index: number) => {
                    const engine: Engine = new Engine();
                    this.addRules(item, index, engine);
                    let issue = null;
                    engine.run().then((event: Array<any>) => {
                        if (event.length >= 0) {
                            if (event[0] !== undefined) {
                                issue = event[0].params.message
                                item.Issue = issue;
                                newResult.push(item);
                            }
                        }
                        if (index === this.results.length - 1) {
                            finalIndex = true;
                            resolve(newResult);
                        }
                    });
                });
            }).then((result: Array<Result>) => {
                finalResult = result;
                resolve(finalResult);
            });
        });
        
        // return newResult;
    }

    private addRules(item: any, index: number, engine: Engine) {
        engine.addRule(new RuleHelper().createRule(this.conditions.conditions.PNC, events.PNC));
        engine.addRule(new RuleHelper().createRule(this.conditions.conditions.PNR, events.PNR));
        engine.addRule(new RuleHelper().createRule(this.conditions.conditions.PNS, events.PNS));
        engine.addRule(new RuleHelper().createRule(this.conditions.conditions.QNC, events.QNC));
        engine.addRule(new RuleHelper().createRule(this.conditions.conditions.SDNC, events.SDNC));

        engine.addFact('table-information', item);
    }



}