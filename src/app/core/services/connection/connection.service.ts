import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {constantes} from '../../constantes';
import { environment } from '../../../../environments/environment';
import  jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private httpClient: HttpClient) { }

  getEmpleadoById(token): any{
    const decoded = jwt_decode(token);
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_EMPLEADO + decoded['userId']);
  }
}
