const SelectQuery = {
    getAllCoid: `select * from oflowetl.OF_COID`,
    getDefaultData: ` select * from (
                        select Key_ID,
                            SalesOrder,
                            Line,
                            dt.Delivery AS Delivery,
                            SalesGrp,
                            MatAvDt,
                            DelivGIDate,
                            SoldtoCust,
                            dt.Material AS Material,
                            dt.PONumber AS PONumber,
                            co.POStat AS POStat,
                            LORCode,
                            Stat
                        from 
                        OF_Details AS dt
                        left join OF_COID AS co
                        on dt.PONumber = co.PONumber
                    ) AS iq`,
    getAllColumnsOfAllTables: `call getColumns()`,
    getAllTables: `show TABLES`,
    createRule: `CALL insertRule('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}')`,
    getAllRules: `SELECT r.id AS RuleId, e.Id as ExpId, name AS RuleName, result AS Result, entity_name AS TableName, field_name AS TableField, function_params AS FuncParams, operator AS Operator, type AS OperatorType, value AS OperatorValue FROM expression e INNER JOIN rule r ON r.id = e.rule_id`,
    updateRule: `call UpdateRule('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}')`
}

export { SelectQuery }