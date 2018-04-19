import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Okta } from './okta.service';
@Component({
    selector: 'app-login',
    template: `<div id="okta-login-container"></div>`
})
export class LoginComponent implements OnInit {
    private oktaSignIn;
    constructor(private okta: Okta, private router: Router) {
        this.oktaSignIn = okta.getWidget();
    }

    public ngOnInit() {
        console.log(this.oktaSignIn.session.exists());
        this.oktaSignIn.session.get((response) => {
            console.log(response.status);
            if (response.status === 'INACTIVE') {
                this.oktaSignIn.renderEl({ el: '#okta-login-container' }, (resp) => {
                    if (resp.status === 'SUCCESS') {
                        localStorage['ngx_auth_usr'] = JSON.stringify(resp);
                        this.router.navigateByUrl('/home');
                    }
                }, (err) => {
                    localStorage.removeItem('ngx_auth_usr');
                    console.log(err);
                });
            } else {
                this.router.navigate(['/home']);
            }
        });
    }
}
