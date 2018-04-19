import { Injectable } from '@angular/core';
import { AppSettings } from '../../app.settings';
import { Router } from '@angular/router';
declare let OktaSignIn: any;

@Injectable()
export class Okta {
  public widget;
  constructor(private router: Router) {
    this.widget = new OktaSignIn({
      baseUrl: AppSettings.AppUrl.okta,
      clientId: 'p6mwdUiLYftQbtnZeJQJ',
      redirectUri: 'http://dev2-puma.iff.com', // 'http://localhost:90',
      logo: './assets/img/iff_logo.png',
      authParams: {
        responseType: 'id_token',
        responseMode: 'okta_post_message',
        scope: [
          'openid',
          'email',
          'profile',
          'groups'
        ]
      },
      labels: {
        'primaryauth.title': 'Single Sign-On for IFF Apps',
        'primaryauth.username.tooltip': 'Enter your User ID (without global)',
        'primaryauth.password.tooltip': 'Enter your password'
      }
    });
  }

  public getWidget() {
    return this.widget;
  }

  public isAuthenticated(): Promise<boolean> {
    return this.widget.session.exists((exists) => {
      console.log('isSession', exists);
      return exists ? true : false;
    });
  }

  public logout() {
    this.widget.signOut(() => {
      localStorage.removeItem('ngx_auth_usr');
      this.router.navigate(['/login']);
    });
  }
}
