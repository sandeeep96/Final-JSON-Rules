import { Http, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/observable';
import { Injectable } from '@angular/core';
import { AppData } from '../../app.data';
import { promise } from 'protractor';

@Injectable()
export class RulesService {
    private AppUrl = 'http://localhost:3000/rules/apply';

    constructor(private http: Http, private appData: AppData) { }

    public getData(): Observable<any> {
        return this.http.get(this.AppUrl)
            .map((response) => response.json());
    }

    public createRule(data): Observable<any> {
        return this.appData.post(this.appData.url.CreateRuleAPI, [], data);
    }
}