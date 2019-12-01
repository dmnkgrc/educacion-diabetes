import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { GoogleAnalyticsService } from '../google-analytics.service';

@Injectable({
  providedIn: 'root',
})
export class NotauthGuard implements CanActivate {
  constructor(
    private router: Router,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const user = this.getDecodedAccessToken(token);
      if (!user.admin) {
        this.googleAnalyticsService.setUserId(user.user_id);
        const insulinPortal = localStorage.getItem('insulinPortal');
        if (!insulinPortal) {
          this.router.navigate(['/inicio']);
        }
        this.router.navigate(['/insulina']);
        return true;
      }
      this.router.navigate(['/admin']);
    }
    return !!!token;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
