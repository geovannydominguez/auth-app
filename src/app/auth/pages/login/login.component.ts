import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../interfaces/interfaces';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loading: boolean;
  user: User;

  userForm: FormGroup = this.fb.group({
    email: ['camilo@rokk3rlabs.com', [Validators.required, Validators.email]],
    password: ['Trudat55!', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as User;
  }

  ngOnInit(): void {
    this.cognitoService.federatedSignIn()
      .then((resp) => {
        console.log(resp);
      }).catch((err) => {
        console.log(err);
      });
  }

  /**
   * Call service for login   * 
   */
  public signIn(): void {
    // TODO
    // this.user = <User>this.userForm.value;

    // this.loading = true;
    // this.cognitoService.signIn(this.user)
    //   .then(() => {
    //     this.router.navigateByUrl('/dashboard');
    //   }).catch((err) => {
    //     this.loading = false;
    //     console.log(err);
    //     Swal.fire('Error', err.name, 'error');
    //   });
  }

}
