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

  getEmpleadoByIdToken(token): any{
    const decoded = jwt_decode(token);
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_EMPLEADO + decoded['userId']);
  }

  getSucursalByIdToken(token): any{
    const decoded = jwt_decode(token);
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_SUCURSAL + decoded['userId']);
  }

  getEmpleadoById(id): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_EMPLEADO + id);
  }

  getTestsByTokenEmpleado(token): any{
    const decoded = jwt_decode(token);
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_TESTS_EMPLEADO + decoded['userId']);
  }

  getTestsByIdEmpleado(id): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_TESTS_EMPLEADO + id);
  }

  getTiposTest(): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_TIPOS_TEST);
  }

  saveTest(test): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_TEST, test);
  }

  getNoticias(): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_NOTICIAS);
  }

  getEpisDisponibles(id): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_GET_EPI_DISPONIBLE, id);
  }

  saveSolicitudEpi(solicitudEpiCompleta): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_SOLICITUD_EPI, solicitudEpiCompleta);
  }

  getSolicitudesEpiByIdUsuario(token): any{
    const decoded = jwt_decode(token);
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_SOLICITUDES_EPI_USUARIO + decoded['userId']);
  }

  getSolicitudesBajaByIdUsuario(): any{
    const decoded = jwt_decode(sessionStorage.getItem('token'));
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_SOLICITUDES_BAJA_USUARIO + decoded['userId']);
  }

  saveFileSolicitudBaja(file){
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_FILE_SOLICITUD_BAJA, file);
  }

  saveSolicitudBaja(baja): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_BAJA, baja);
  }


  downloadSolicitudBaja(nombreArchivo){
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_DOWNLOAD_SOLICITUD_BAJA+nombreArchivo,{responseType:'blob'});
  }

  downloadTest(nombreArchivo){
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_DOWNLOAD_TEST+nombreArchivo,{responseType:'blob'});
  }

  saveUsuario(usuario, jornada): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_USUARIO, {usuario,jornada});
  }

  getAllEmpleadosBySucursal(parameters): any {
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_GET_EMPLEADOS_BY_PARAMETERS,  parameters);
  }

  getEmailsEmpleados(sucursal): any {
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_ALL_EMAILS + sucursal);
  }

  getAllSolicitudesEPI(parameters): any {
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_SOLICITUDES_EPI_BY_PARAMETERS, parameters);
  }

  getMaterialesSolicitudEPI(id): any {
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_MATERIALES_SOLICITUD_EPI + id);
  }


  updateSolicitudEpi(solicitudEpi): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_PUT_SOLICITUD_EPI, solicitudEpi);
  }

  getAllSolicitudesBaja(parameters): any {
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_SOLICITUDES_BAJA_BY_PARAMETERS, parameters);
  }

  updateSolicitudBaja(solicitudBaja): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_PUT_SOLICITUD_BAJA, solicitudBaja);
  }

  saveNoticia(noticia): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_NOTICIA, noticia);
  }

  getTiposEpi(): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_TIPOS_EPI);
  }

  saveEPI(epi): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_EPI, epi);
  }

  getEpis(id): any {
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_EPIS_BY_ID_SUCURSAL + id);
  }

  getSolicitudesAprobadas(): any {
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_SOLICITUDES_ANALISIS);
  }

  getEpisAnalisis(params): any {
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_GET_EPIS_ANALISIS, params);
  }

  getBajasAnalisis(): any {
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_BAJAS_ANALISIS);
  }

  getVacunasAnalisis(id): any {
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_VACUNAS_ANALISIS + id);
  }

  getNoticiasByIdSucursal(id): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_NOTICIAS_BY_SUCURSAL + id);
  }

  deleteNoticia(noticia): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_DELETE_NOTICIA, noticia);
  }

  editNoticia(noticia): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_UPDATE_NOTICIA, noticia);
  }

  getSucursalesByIdEmpresa(id): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_SUCURSALES_BY_ID_EMPRESA + id);
  }

  updateUsuario(usuario): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_PUT_USUARIO, usuario);
  }

  updateUsuarioByDirectivo(usuario): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_PUT_USUARIO_BY_DIRECTIVO, usuario);
  }

  updateJornadaByDirectivo(jornada): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_PUT_JORNADA_BY_DIRECTIVO, jornada);
  }

  updatePasswordUsuario(usuario): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_PUT_USUARIO_PASSWORD, usuario);
  }

  updatePasswordSucursal(sucursal): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_PUT_SUCURSAL_PASSWORD, sucursal);
  }

  saveFileTest(file){
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_FILE_TEST, file);
  }

  getTiposVacuna(): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_TIPOS_VACUNA);
  }

  saveVacuna(vacuna): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_VACUNA, vacuna);
  }

  getVacunasByIdEmpleado(id): any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_VACUNAS_EMPLEADO + id);
  }

  saveFileVacuna(file){
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_FILE_VACUNA, file);
  }

  downloadVacuna(nombreArchivo){
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_DOWNLOAD_VACUNA+nombreArchivo,{responseType:'blob'});
  }

  getJornadaByIdUsuario(id){
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_VACUNAS_EMPLEADO + id);
  }

  deleteEpi(epi): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_DELETE_EPI, epi);
  }

  getStockEpiBySucursal(id):any{
    return this.httpClient.get(environment.apiUrl + constantes.SERVICE_GET_STOCK_EPI_SUCURSAL + id);
  }

  saveStockMinimo(stockEpis): any{
    return this.httpClient.post(environment.apiUrl + constantes.SERVICE_POST_STOCK_EPI_SUCURSAL, stockEpis);
  }

  deleteTest(test): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_DELETE_TEST, test);
  }

  editTest(test): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_UPDATE_TEST, test);
  }

  deleteVacuna(vacuna): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_DELETE_VACUNA, vacuna);
  }

  editVacuna(vacuna): any{
    return this.httpClient.put(environment.apiUrl + constantes.SERVICE_UPDATE_VACUNA, vacuna);
  }

}
