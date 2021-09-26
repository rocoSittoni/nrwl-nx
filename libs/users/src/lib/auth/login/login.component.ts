import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmited = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginForm = this.fb.group({
      email: [ '', [ 
        Validators.required,
        Validators.email,
      ]],
      password: [ '', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]]
    })
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.loginForm.invalid) return;
    this.auth.login(this.loginFormControls.email.value, this.loginFormControls.password.value)
      .subscribe(
        (user) => {
          this.authError = false;
          this.localStorageService.setToken(user.token);
          this.router.navigate(['/']);
        },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the server, try again later';
        }
      });
  }

}
