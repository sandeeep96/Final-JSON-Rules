import * as express from 'express';
import { DetailsManager } from '../managers/details.manager';
import { Router, Request, Response, NextFunction } from 'express';

export class DetailsController {

    public static route = '/rules';
    public router: express.Router = express.Router();

    constructor() {
        this.router.get('/apply', this.applyDefaultRule);
        this.router.get('/getAllTables', this.getTables);
        this.router.get('/getAllColumns', this.getAllColumns);
        this.router.get('/getAllRules', this.getAllRules);

        this.router.post('/createRule', this.createRule);
        
        this.router.put('/updateRule/:ruleId', this.updateRule);
    }

    /* 
     * Get the Data from the db and apply the default rules.
     */
    private applyDefaultRule(req: express.Request, res: express.Response, next: express.NextFunction) {
        new DetailsManager().getDefaultData()
            .then(data => res.send(data))
            .catch(error => next(error));
    }

    /* 
     * Get the columns of all the tables.
     */
    private getAllColumns(req: Request, res: Response, next: NextFunction) {
        new DetailsManager().getAllColumns()
            .then((data) => {
                res.send(data);
            })
            .catch(err => {
                next(err);
            });
    }

    /* 
     * Get the required tables to which the Rules may be applied.
     */
    private getTables(req: Request, res: Response, next: NextFunction) {
        new DetailsManager().getAllTables()
            .then((data) => {
                res.send(data);
            })
            .catch(err => {
                next(err);
            });
    }

    /* 
     * Create a new Rule
     */
    private createRule(req: Request, res: Response, next: NextFunction) {
        new DetailsManager().createNewRule(req.body)
            .then((data) => {
                res.send({ message: 'Query successfully executed!' });
            })
            .catch(error => {
                const newError = {
                    code: error.code,
                    message: error.sqlMessage,
                    stack: error.stack
                }
                console.log('Error: ', newError);
                next(newError);
            });
    }

    /* 
     * Get all rules
     */
    private getAllRules(req: Request, res: Response, next: NextFunction) {
        new DetailsManager().getRules()
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                const newError = {
                    code: error.code,
                    message: error.sqlMessage,
                    stack: error.stack
                }
                next(newError);
            });
    }

    /* 
     * Update the rule
     */
    private updateRule(req: Request, res: Response, next: NextFunction) {
        new DetailsManager().updateRules(req.params.ruleId, req.body)
            .then(data => {
                console.log(data);
                res.send('Updated SuccessFully!!');
            })
            .catch(error => next(error));
    }
}