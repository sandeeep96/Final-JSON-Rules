import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Okta } from '../okta/okta.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private okta: Okta, private router: Router) { }
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

        return true;

    }
}
