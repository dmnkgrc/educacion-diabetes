import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
  CanActivateChild
} from '@angular/router';
import { Injectable } from '@angular/core';

import * as jwt_decode from 'jwt-decode';

import { GoogleAnalyticsService } from '../google-analytics.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,  private googleAnalyticsService: GoogleAnalyticsService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
    }
    const res = !!token;
    if (res) {
      const user = this.getDecodedAccessToken(token);
      this.googleAnalyticsService.setUserId(user.user_id);
    }
    return res;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  getDecodedAccessToken(token: string): any {
    try {
        return jwt_decode(token);
    } catch (Error) {
        return null;
    }
  }
}
