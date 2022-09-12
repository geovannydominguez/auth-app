import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import Auth from '@aws-amplify/auth';
import { Observable } from 'rxjs';
import { CognitoService } from '../auth/services/cognito.service';

/**
 * Prevent access to routes if access-token is not present.
 * 
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private cognitoService: CognitoService, private router: Router) { }

  /**
   * Is used to prevent unauthorized users from accessing certain routes.
   * 
   * @param route 
   * @param state 
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> | boolean {
    return Auth.currentAuthenticatedUser().then((resp) => {
      return true;
    })
      .catch(() => {
        console.log('canActivate false');
        this.router.navigate(['/auth']);
        return false;
      });
  }

  /**
   * Is used to prevent the application from loading entire modules lazily if the user is not authorized to do so
   * 
   * @returns 
   */
  canLoad(): Promise<boolean | boolean> {
    return Auth.currentAuthenticatedUser().then((resp) => {
      return true;
    })
      .catch(() => {
        console.log('canLoad false');
        this.router.navigate(['/auth']);
        return false;
      });
  }

}
