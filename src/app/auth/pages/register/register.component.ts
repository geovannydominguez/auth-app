import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { User } from '../../interfaces/interfaces';
import { CognitoService } from '../../services/cognito.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  loading: boolean;
  user: User;

  miFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as User;
  }

  public signUp(): void {
    this.loading = true;
    this.user = <User>this.miFormulario.value;
    this.cognitoService.signUp(this.user)
      .then(() => {
        this.loading = false;
      }).catch((err) => {
        console.log(err);
        this.loading = false;
        Swal.fire('Error', err.name, 'error');
      });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
      .then(() => {
        this.router.navigateByUrl('/auth');
      }).catch(() => {
        this.loading = false;
      });
  }

}
