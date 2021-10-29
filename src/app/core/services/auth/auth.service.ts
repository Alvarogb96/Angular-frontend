import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import  jwt_decode from 'jwt-decode';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { first, catchError, tap, map,  } from "rxjs/operators";
import { Router } from '@angular/router';

import {usuarioLogin} from '../../models/usuarioLogin'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken: string;
  userRole: string;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private httpClient: HttpClient, private router: Router) { }



  login(authData: usuarioLogin): any{
    return this.httpClient
    .post(`${environment.apiUrl}/login`, authData)
    .pipe(
    map( (res) =>  {
      this.saveToken(res['token']);
      this.saveRole(res['role']);
      return res;
    }),
    catchError((err) => this.handlerError(err))
    );

  }

  private saveToken(token: string) {
    this.userToken = token;
    sessionStorage.setItem('token', token);
  }

  private saveRole(role: string){
    this.userRole = role;
    sessionStorage.setItem('role', role);
  }

  private handlerError(err): Observable<any> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      //if(err.message = 'Http failure response for http://localhost:3000/login: 401 Unauthorized')
      //errorMessage = `Error: code ${err.message}`;
      errorMessage = `${err.error.message}`;
    }
    
    return throwError(err);
  }

  logout(){
    this.remove();
    this.router.navigateByUrl('/login');
  }

  remove() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('role');
  }

  getToken() {
    if (sessionStorage.getItem('token')) {
      this.userToken = sessionStorage.getItem('token');

    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  isAuth(): boolean {
    let auth = false;
    if (this.getToken() !== '') {
      auth = true;
    }
    return auth;
  }

}
