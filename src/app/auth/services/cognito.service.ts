import { Injectable } from '@angular/core';

import Amplify, { Auth } from 'aws-amplify';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    console.log('constructor service');

    // Configure Amazon Cognito
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  /**
   * To get AWS credentials directly from Cognito Federated Identities and not use User Pool federation.
   * 
   * @returns 
   */
  public federatedSignIn(): Promise<any> {
    return Auth.federatedSignIn()
      .then(() => {
        this.authenticationSubject.next(true);
      });
  }

  /**
   * Create a new user in the Amazon Cognito UserPool by passing the new user's email address, password, and other attributes to Auth.signUp.
   * 
   * @param user 
   * @returns Data object of type ISignUpResult with a CognitoUser.
   */
  public signUp(user: User): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  /**
   * If you enabled multi-factor auth, confirm the sign-up after retrieving a confirmation code from the user.
   * 
   * @param user 
   * @returns 
   */
  public confirmSignUp(user: User): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  /**
   * Sign-in
   * 
   * @param user 
   * @returns CognitoUser
   */
  public signIn(user: User): Promise<any> {
    return Auth.signIn(user.email, user.password)
      .then(() => {
        this.authenticationSubject.next(true);
      });
  }

  /**
   * Sign-out
   * 
   * @returns 
   */
  public signOut(): Promise<any> {
    return Auth.signOut()
      .then(() => {
        this.authenticationSubject.next(false);
      });
  }

  /**
   * Check if user is authenticated
   * 
   * @returns 
   */
  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
        .then((user: any) => {
          if (user) {
            return true;
          } else {
            return false;
          }
        }).catch(() => {
          return false;
        });
    }
  }

  /**
   * Get user information
   * 
   * @returns 
   */
  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  /**
   * Update an authenticated users' attributes
   * 
   * @param user 
   * @returns 
   */
  public updateUser(user: User): Promise<any> {
    return Auth.currentUserPoolUser()
      .then((cognitoUser: any) => {
        return Auth.updateUserAttributes(cognitoUser, user);
      });
  }

  /**
   * Get current user's session
   * 
   * @returns 
   */
  public currentUserCredentials(): Promise<any> {
    return Auth.currentSession();
  }

}
