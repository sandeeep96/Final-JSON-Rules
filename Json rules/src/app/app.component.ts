import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.state';
import { AppData } from './app.data';
import { Okta } from './shared/okta/okta.service';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public userPhotoUrl: string;
  constructor(private okta: Okta, private appData: AppData) {
    console.log('Welcome to IFF Apps');
  }

  public ngOnInit(): void {
    console.log('App Initialized');
    try {
      // let userInfo = JSON.parse(localStorage['ngx_auth_usr']);
      // if (userInfo) {
      //   this.userPhotoUrl = this.appData.url.user + userInfo.claims.preferred_username.split('@')[0] + '/photo?token=' + userInfo.idToken;
      // }
    } catch (error) {
      console.log(error);
    }
  }

  public logOut() {
    this.okta.logout();
  }
}
