export interface Rule {
    RuleId: number,
    RuleName: string,
    Result: string,
    Rules: Array<{
        ExpId: number
        TableName: string,
        TableField: string,
        Operator?: string,
        OperatorType?: string,
        OperatorValue?: string,
        FuncParams?: string
    }>
}