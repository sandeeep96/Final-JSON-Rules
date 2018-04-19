import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AppState } from '../app.state';
import { AppData } from '../app.data';
@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public welcomeMsg: string = '';
  public additionalInfo: string = '';
  public sqlData: any;
  public entData: any;
  public sapData: any;
  public oktaData: any;
  constructor(public appState: AppState, public title: Title, private appData: AppData) {
    this.title.setTitle('Home Page');
  }

  public ngOnInit() {
    console.log('hello `Home` component');
    this.welcomeMsg = 'Welcome to IFF Base Template';
    this.additionalInfo = 'Clone this application to start a new project';
    this.populateDataFromSQLServer();
    this.populateDataFromEntLib();
    this.populateDataFromSAP();
    this.populateDataFromOkta();
  }

  private populateDataFromSQLServer() {
    this.appData.get(this.appData.url.sqlTest, []).subscribe((results) => {
      console.log('Loaded SQL data successfully.');
      this.sqlData = results;
    }, (err) => {
      console.log(err);
    });
  }

  private populateDataFromEntLib() {
    this.appData.get(this.appData.url.ADPeoplePicker, ['raja']).subscribe((results) => {
      console.log('Loaded User data successfully.');
      this.entData = results;
    }, (err) => {
      console.log(err);
    });
  }

  private populateDataFromSAP() {
    this.appData.get(this.appData.url.customerList, []).subscribe((results) => {
      console.log('Loaded SAP data successfully.');
      this.sapData = results.d.results;
    }, (err) => {
      console.log(err);
    });
  }

  private populateDataFromOkta() {
    // this.oktaData = JSON.parse(localStorage['ngx_auth_usr']);
    // console.log(this.oktaData);
  }
}
