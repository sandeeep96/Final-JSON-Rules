import { Rule } from 'json-rules-engine';

export class RuleHelper {

    public createRule(conditions: any, event: {type: string, params: {message: string}}) {
        return new Rule({conditions, event});
    }

}