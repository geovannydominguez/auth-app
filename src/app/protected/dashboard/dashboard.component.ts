import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserSession, User } from 'src/app/auth/interfaces/interfaces';
import { CognitoService } from 'src/app/auth/services/cognito.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
    `
    * {
      margin: 15px;
    }
    `
  ]
})
export class DashboardComponent implements OnInit {

  user: User;
  userSession: CognitoUserSession;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.user = {} as User;
    this.userSession = {} as CognitoUserSession;
  }

  ngOnInit(): void {
    this.cognitoService.getUser().then((user: any) => {
      this.user = user;
    });
    this.cognitoService.currentUserCredentials().then((user: any) => {
      console.log(user);
      this.userSession.idToken = user.idToken.jwtToken;
      this.userSession.accessToken = user.accessToken.jwtToken;
      this.userSession.refreshToken = user.refreshToken.token;
    });
  }

  logout() {
    this.cognitoService.signOut().then(() => {
      this.router.navigateByUrl('/auth');
    });
  }

}
