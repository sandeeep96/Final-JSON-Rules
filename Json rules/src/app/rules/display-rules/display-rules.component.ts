import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';
import { AppData } from '../../app.data';
import { orderBy, each, map, filter, remove, eachRight, findIndex, find } from 'lodash';
import { RulesService } from '../../shared/providers/rules.service';
import { Engine, Rule } from 'json-rules-engine';

@Component({
    selector: 'display-rules',
    templateUrl: './display-rules.component.html',
    styleUrls: ['./display-rules.component.css']
})
export class DisplayRulesComponent implements OnInit {
    @ViewChild('textarea')
    private txtArea: ElementRef;
    public rulesArray: FormArray;
    public fromEdit: boolean = false;
    public form: FormGroup;
    public editForm: FormGroup;
    public selectedValue: any;
    public diableDropdowns: boolean = true;
    public tableFeildsRespInfo: any;
    public tableFeildsOfEachRow: any = [];
    public tableFeilds: any;
    public tableNames: any;
    public AllRulesInfo: any;
    public operators = [
        { Operaror: "equal", Symobol: "==" },
        { Operaror: "notEqual", Symobol: "!=" },
        { Operaror: "in", Symobol: "IN" },
        { Operaror: "lessThan", Symobol: "<" },
        { Operaror: "lessThanInclusive", Symobol: "<=" },
        { Operaror: "greaterThan", Symobol: ">" },
        { Operaror: "greaterThanInclusive", Symobol: ">=" }
    ];
    public operandDatatypes = [
        { Type: "string" },
        { Type: "boolean" },
        { Type: "number" }
    ];

    constructor(private fb: FormBuilder, private appData: AppData, private rulesService: RulesService) { }

    ngOnInit() {
        this.initializeForm();
        this.getTableNames();
        this.getTableColumns();
        this.getAllRules();
    }
    public initializeForm() {
        this.tableFeildsOfEachRow.length = 0;
        this.form = this.fb.group({
            ruleName: ['', Validators.required],
            ruleResult: [''],
            rules: this.fb.array([
            ]),
        });
        this.rulesArray = this.form.get('rules') as FormArray;
        this.onAddRow();
        console.log(" initialiwz from:",this.form)
    }
    public getTableNames(): void {
        this.appData.get(this.appData.url.GetTablesNames, []).subscribe((res) => {
            console.log("table Names:", res);
            this.tableNames = res.Tables;
        })
    }
    public getTableColumns() {
        this.appData.get(this.appData.url.GetTablesColumns, []).subscribe((res) => {
            console.log("table columns:", res)
            this.tableFeildsRespInfo = res;
        })
    }
    public getAllRules() {
        this.appData.get(this.appData.url.GetAllRules, []).subscribe((res) => {
            // console.log("all rules", res);
            // this.AllRulesInfo = res;
            each(res, (eachRule) => {
                eachRule.isSelected = false;
            });
            this.AllRulesInfo = res;
            console.log("rules:", this.AllRulesInfo)
        })
    }
    public onAddRow(): void {
        this.rulesArray.push(this.createDetails());
        this.tableFeildsOfEachRow.push({ feilds: [] })
    }
    public onRemoveRow(index) {
        this.rulesArray.removeAt(index);
        this.tableFeildsOfEachRow.splice(index, 1);
        // console.log("options:", this.tableFeildsOfEachRow)

    }
    public createDetails(): FormGroup {
        return this.fb.group({
            tableName: ['', Validators.required],
            tableField: [{ value: '', disabled: true }, Validators.required],
            operator: [{ value: '', disabled: true }, Validators.required],
            operandDatatype: [{ value: '', disabled: true }, Validators.required],
            operandValue: [''],
        });
    }
    public onSelect(index, event): void {
        this.rulesArray.controls[index].get('tableField').enable()
        this.rulesArray.controls[index].get('tableField').setValue(null);
        this.rulesArray.controls[index].get('operator').enable()
        this.rulesArray.controls[index].get('operandDatatype').enable()
        this.rulesArray.controls[index].get('operandValue').enable()
        switch (event) {
            case "of_coid":
                this.tableFeildsOfEachRow[index].feilds = this.tableFeildsRespInfo.of_coid;
                break;
            case "of_details":
                this.tableFeildsOfEachRow[index].feilds = this.tableFeildsRespInfo.of_details;
                break;
            case "of_factorycal":
                this.tableFeildsOfEachRow[index].feilds = this.tableFeildsRespInfo.of_factorycal;
                break;
            case "of_masterdata":
                this.tableFeildsOfEachRow[index].feilds = this.tableFeildsRespInfo.of_masterdata;
                break;
            case "of_variables":
                this.tableFeildsOfEachRow[index].feilds = this.tableFeildsRespInfo.of_variables;

                break;
        }

    }
    public onSubmitRules() {
        // console.log("submit:", this.form.value);
        this.rulesService.createRule(this.form.value)
            .subscribe((res) => {
                console.log("submitted", res._body);
                this.onClearRules();
                setTimeout(() => {
                    this.getAllRules();
                }, 1000);
            });

    }
    public onClearRules() {
        this.initializeForm();
        // this.form.reset();
    }
    public onTotalCheck(isChecked) {
        each(this.AllRulesInfo, (rowItem) => {
            rowItem.isSelected = isChecked;
        });
    }
    public canExecuteButtonBeDisabled() {
        let selectedRules = filter(this.AllRulesInfo, (rowItem) => {
            return rowItem['isSelected'] == true;
        });
        if (selectedRules.length > 0 && this.txtArea.nativeElement.value.length > 0) {
            return false;
        } else {
            return true;
        }
    }
    public onExecute(text) {
        // console.log("text written:", this.txtArea.nativeElement.value);
        let selectedRules = filter(this.AllRulesInfo, (rowItem) => {
            return rowItem['isSelected'] == true;
        });
        // console.log("selected rows:", selectedRules);
        let payload = {
            rules: selectedRules,
            jsonData: this.txtArea.nativeElement.value
        }
        // this.appData.post(this.appData.url.ExecuteRules, [], payload)
        // .subscribe((res)=>{
        //     console.log(res)
        // })
        this.InitializeJsonRuleEngine(payload);
    }
    public InitializeJsonRuleEngine(data) {
        let conditions = {
            condition1: {
                all: []
            }
        }

        // console.log("rule1:", data.rules[0].Rules)

        each(data.rules[0].Rules, (eachRule) => {
            let rule = {
                fact: 'table-information',
                operator: this.getOperator(eachRule.Operator),
                value: eachRule.OperatorValue,
                path: '.' + eachRule.TableField
            }
            conditions.condition1.all.push(rule);
        })
        let event = {
            event1: {
                type: data.rules[0].Result,
                params: {
                    message: data.rules[0].Result
                }
            }
        }
        // console.log("conditions:",conditions.condition1);
        // console.log("events:",event.event1)
        this.createRuleEngine(conditions.condition1, event.event1, data.jsonData)
    }
    public getOperator(data) {
        let opr = find(this.operators, (eachOperarot) => eachOperarot.Symobol == data)
        return opr.Operaror;
    }
    public createRuleEngine(conditions, events, jsondata) {
        let rule = {
            conditions: conditions,
            event: events
        }
        console.log("entire rule is:", rule)
        const engine = new Engine();
        engine.addRule(rule);
        engine.addFact('table-information', JSON.parse(jsondata));
        engine.run().then((event: Array<any>) => {
            if (event.length >= 0) {
                document.getElementById('result').innerHTML = event[0].type;
                // console.log(event)
                setTimeout(() => {
                    document.getElementById('result').innerHTML = '';
                }, 5000);
                // if (event[0] !== undefined) {
                //     issue = event[0].params.message
                //     item.Issue = issue;
                //     newResult.push(item);
                // }
            }
            // if (index === this.results.length - 1) {
            //     finalIndex = true;
            //     resolve(newResult);
            // }
        });
    }
    public onEdit(index) {
        this.initializeSelectedForm(this.AllRulesInfo[index])
    }
    public initializeSelectedForm(selectedRule) {
        this.fromEdit = true;
        this.tableFeildsOfEachRow.length = 0;
        this.editForm = this.fb.group({
            ruleId: [selectedRule.RuleId],
            ruleName: [selectedRule.RuleName, Validators.required],
            ruleResult: [selectedRule.Result, Validators.required],
            rules: this.fb.array([
            ]),
        });
        this.rulesArray = this.editForm.get('rules') as FormArray;
        each(selectedRule.Rules, (eachRule) => {
            this.tableFeildsOfEachRow.push({ feilds: this.getFeildsBasedOnTableNames(eachRule.TableName) })
            this.rulesArray.push(this.fb.group({
                expId: [eachRule.ExpId],
                tableName: [eachRule.TableName, Validators.required],
                tableField: [eachRule.TableField, Validators.required],
                operator: [eachRule.Operator, Validators.required],
                operandDatatype: [eachRule.OperatorType, Validators.required],
                operandValue: [eachRule.OperatorValue],
            }));
        })
        console.log(this.editForm);
    }
    public getFeildsBasedOnTableNames(tableName) {
        switch (tableName) {
            case "of_coid":
                return this.tableFeildsRespInfo.of_coid;
            case "of_details":
                return this.tableFeildsRespInfo.of_details;
            case "of_factorycal":
                return this.tableFeildsRespInfo.of_factorycal;
            case "of_masterdata":
                return this.tableFeildsRespInfo.of_masterdata;
            case "of_variables":
                return this.tableFeildsRespInfo.of_variables;
        }
    }
    public onCancelEdit() {
        this.form.reset();
        this.initializeForm();
        this.fromEdit = false;
    }
    public onEditRules() {
        // console.log("Edit the rules:", this.editForm.value);
        this.appData.put(this.appData.url.UpdateRules, [this.editForm.value.ruleId], this.editForm.value).subscribe(data => console.log('Response: ', data))
    }
}