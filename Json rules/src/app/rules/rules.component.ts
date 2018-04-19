import { Component } from '@angular/core';
import { RulesService } from '../shared/providers/rules.service';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.css']
})
export class RulesComponent {
    public results: Array<any>;

    constructor(private rulesService: RulesService) { }

    public getCoidData() {
        this.rulesService.getData().subscribe((result) => {
            this.results = result;
        });
    }
    public addRow(): void {
        // let element = document.getElementById('table1');
        // element.appendChild();
        var th = document.querySelectorAll('#table th');
        if (th.length) {
            let table = document.createElement('table');
            let headOptions = " <th> </th>  <th> </th> <th> </th> <th> </th> <th> </th> <th> </th> ";
            table.innerHTML = headOptions;
            document.getElementById('table').appendChild(table.firstChild);
        }

        let tableData = `<td>
        <select name="" id="">
            <option value="purchase order">purchase order</option>
            <option value="Order Details">Order Details</option>
            <option value="">test</option>
        </select>
    </td>
    <td>
        <select name="" id="">
            <option value="Field-1">Field-1</option>
            <option value="Field-2">Field-2</option>
            <option value="Field-3">Field-3</option>
        </select>
    </td>

    <td>
        <select name="" id="">
            <option value="IN">In</option>
            <option value="Greater Than"> > </option>
            <option value="Equal"> = </option>
        </select>
    </td>
    <td>
        <input type="text">
    </td>
    <td>
        <input type="text">
    </td>
    <td>
        <button type="">Edit</button>
    </td>`
        let table1 = document.createElement('table');
        table1.innerHTML = tableData;
        document.getElementById('table1').appendChild(table1.firstChild);
    }
}