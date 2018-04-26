import { AppState } from './app.state';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppParams } from './app.params';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { AppSettings } from './app.settings';

@Injectable()
export class AppData {

    public url = {
        oktame: AppSettings.AppUrl.okta + '/api/v1/users/me',
        me: AppSettings.AppUrl.api + 'users/me',
        user: AppSettings.AppUrl.api + 'users/', // Not intended for backend request. Can be used to construct Urls
        GetUserById: AppSettings.AppUrl.api + 'users/{0}',
        ADPeoplePicker: AppSettings.AppUrl.api + 'users?displayname={0}',
        RulesData: AppSettings.AppUrl.rule + 'rules/create',
        GetTablesNames: AppSettings.AppUrl.rule + 'rules/getAllTables',
        GetTablesColumns: AppSettings.AppUrl.rule + 'rules/getAllColumns',
        GetAllRules: AppSettings.AppUrl.rule + 'rules/getAllRules',
        CreateRuleAPI: AppSettings.AppUrl.rule + 'rules/createRule',
        ExecuteRules: AppSettings.AppUrl.rule + 'rules/executeRules',
        UpdateRules: AppSettings.AppUrl.rule + 'rules/updateRule/{0}',
        // EJS URLs
        sqlTest: AppSettings.AppUrl.api + 'home',

        // SAP Data URls
        customerList: AppSettings.AppUrl.sap + 'ZR3_MASTER_DATA_SRV/Customers/?$select=CustCode,CustName,CustClassFr'
    };

    constructor(private http: Http, private appState: AppState) { }

    public getNoMapData(qry: string, prm: string[]): Observable<any> {
        let aQry = this.formatQuery(qry, prm);
        return this.http.get(aQry);
    }

    public get(qry: string, prm: string[]): Observable<any> {
        let heads = new Headers();
        // heads.append('x-access-token', JSON.parse(localStorage['ngx_auth_usr']).idToken);
        let options = new RequestOptions({ headers: heads });
        options.withCredentials = true;
        let aQry = this.formatQuery(qry, prm);
        return this.http.get(aQry, options).map((res) => res.json());
    }

    public post(qry: string, prm: any[], data: any) {
        let hdr = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: hdr });
        let aQry = this.formatQuery(qry, prm);
        return this.http.post(aQry, data, options).map((res) => {
            // console.log(res)
            // console.log(res.json())
            return res;
        });
    }

    public put(qry: string, prm: any[], data: any): Observable<Response> {
        let hdr = new Headers({ 'Content-Type': 'application/json', 'accept': 'application/json' });
        let options = new RequestOptions({ headers: hdr });
        let aQry = this.formatQuery(qry, prm);
        console.log(aQry);
        return this.http.put(aQry, data, options).map((res) => {
            console.log(data);
            return res.json();
        });
    }

    private formatQuery(qry: string, prm: string[]) {
        let theString = arguments[0];
        if (arguments.length !== 2) {
            return theString;
        }

        let theParams = arguments[1];
        for (let i = 0; i < theParams.length; i++) {
            if (theParams[i] !== undefined && theParams[i] !== null) {
                // tslint:disable-next-line:quotemark
                let regEx = new RegExp("\\{" + i + "\\}", "gm");
                theString = theString.replace(regEx, theParams[i]);
            }
        }
        return theString;
    }
    public getData(qry: string, prm: any[]): Observable<any> {
        let heads = {
            "Cache-control": 'no-cache,no-store',
            'Expires': '0',
            'Pragma': 'no-cache',
            'x-access-token': this.getToken(),
            'x-userid': this.getId()
        };
        let options = { headers: heads, withCredentials: true };
        let aQry = this.formatQuery(qry, prm);
        return this.httpClient.get(aQry, options);
    }

    public getDataCache(qry: string, prm: any[]): Observable<any> {
        let heads = {
            'x-access-token': this.getToken(),
            'x-userid': this.getId()
        };
        let options = { headers: heads, withCredentials: true };
        let aQry = this.formatQuery(qry, prm);
        if (this.appState.get(aQry)) {
            return Observable.of(this.appState.get(aQry));
        } else {
            return this.httpClient.get(aQry, options)
                .map((response) => {
                    this.appState.set(aQry, response);
                    return response;
                });
        }

    }

    public getToken() {
        return this.oAuthSvc.getIdToken();
    }

    public getId() {
        return this.appState.get(this.appState.stateId.userInfo) ? this.appState.get(this.appState.stateId.userInfo).Id : 'mxj1234';
    }

    public getSAPData(qry: string, prm: string[]): Observable<any> {
        let heads = {
            'accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'x-access-token': this.getToken(),
            'Authorization': 'Basic QUxFUkVNT1RFOlN5c2FkbWluMQ==',
            'x-userid': this.getId()
        };
        let options = { headers: heads, withCredentials: true };
        let aQry = this.formatQuery(qry, prm);
        let response = this.httpClient.get(aQry, options);
        this.appState.set(aQry, response);
        return response;
    }

    public getSAPDataCache(qry: string, prm: string[]): Observable<any> {
        let heads = {
            'accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'x-access-token': this.getToken(),
            'Authorization': 'Basic QUxFUkVNT1RFOlN5c2FkbWluMQ=='
        };
        let options = { headers: heads, withCredentials: true };
        let aQry = this.formatQuery(qry, prm);
        if (this.appState.get(aQry)) {
            return Observable.of(this.appState.get(aQry));
        } else {
            let response = this.httpClient.get(aQry, options);
            this.appState.set(aQry, response);
            return response;
        }
    }
    public getUrl(qry: string, prm: any[]) {
        let index = qry.indexOf('?');
        qry += index === -1 ? '?token=' + this.getToken() :
            '&token=' + this.getToken() + '&x-userid=' + this.getId();
        return this.formatQuery(qry, prm);
    }

    public getUrlWithoutToken(qry: string, prm: any[]) {
        // let index = qry.indexOf('?');
        // qry += index === -1 ? '?token=' + this.getToken() :
        //     '&token=' + this.getToken();
        return this.formatQuery(qry, prm);
    }

    public getImageUrl(qry: string, prm: any[]) {
        return this.formatQuery(qry, prm);
    }
    public postToSap(qry: string, prm: any[], data: any): Observable<any> {

        let sapHeaders = {
            'Content-Type': 'application/json',
            'X-CSRF-Token': 'Fetch',
            'Accept': 'application/json'
        };
        let options = { headers: sapHeaders };
        let sapUrl = AppSettings.AppEnvironment === 'dev' ?
            this.url.R3TokenUrl : 'http://dev-puma.iff.com/_sapdgw/sap/opu/odata/sap/ZR3_MASTER_DATA_SRV/';
        // let aQry = this.formatQuery(tokenUrl, []);
        return this.httpClient.get(sapUrl, { headers: sapHeaders, observe: 'response' })
            .switchMap((result: any) => {
                let sapPostHeaders = {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': result.headers.get("x-csrf-token"),
                    'Accept': 'application/json',
                    'x-access-token': this.getToken()
                };
                let postoptions = { headers: sapPostHeaders };
                let aQry = this.formatQuery(qry, prm);
                return this.httpClient.post(aQry, data, postoptions);
            });
    }
    public deleteData(qry: string, prm: any[]): Observable<any> {
        let heads = {
            "Cache-control": 'no-cache,no-store',
            'Expires': '0',
            'Pragma': 'no-cache',
            'x-access-token': this.getToken(),
            'x-userid': this.getId()
        };
        let options = { headers: heads, withCredentials: true };
        let aQry = this.formatQuery(qry, prm);
        return this.httpClient.delete(aQry, options);
    }
}
