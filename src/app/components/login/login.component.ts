import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { constantes } from 'src/app/core/constantes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginPulsado: boolean = false;
  errorLogin: boolean = false;
  errorLoginText: string = "";

  constructor(private auth: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required,
      ])
    });
   }

  ngOnInit(): void {

  }

  login(){
    const authData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    }
    if(!this.loginForm.get('email').invalid && !this.loginForm.get('password').invalid){
    this.auth.login(authData).subscribe((res) => {
      this.router.navigateByUrl('main/datos');
    }, (err) =>{
      if (err.status === 401) {
       this.errorLogin = true;
       this.errorLoginText =err.error.message;
      }
    });
     } else {
      this.loginPulsado = true;
    }
  }

  getEmailErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return constantes.EMAIL_VACIO;
    } else if(this.loginForm.get('email').hasError('email')){
      return constantes.EMAIL_ERROR;
    }
  }
  getPasswordErrorMessage(){
    if(this.loginForm.get('password').hasError('required')){
      return constantes.PASSWORD_VACIA;   
    }
  }

}
