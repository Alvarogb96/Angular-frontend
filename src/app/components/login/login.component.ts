import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

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
  if(this.loginForm.value.email !== '' && this.loginForm.value.password !== ''){
    this.auth.login(authData).subscribe((res) => {
      console.log(res);

    this.router.navigateByUrl('main');
    
    }, (err) =>{
      if (err.status === 401) {
        //this.showError = true;
        
      }
    });

    }
  }

}
