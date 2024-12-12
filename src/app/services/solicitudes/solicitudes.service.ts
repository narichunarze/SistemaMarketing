import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from "rxjs";

import { environment } from 'src/environments/environment';
import { ICreateBranchOffice, IUpdateBranchOffice } from 'src/app/model/branchOffice/branchOffice';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = environment.apiUrl;


  constructor(private httpClient: HttpClient) {
  }

  getBranchOfficePageable(paramsObj: any): Observable<any> {
    let params = new HttpParams;

    for (let key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.httpClient.get<any>(`${this.apiUrl}/api/v1/branch-offices`,  { params });
  }

  createBranchOfficeArt(objetoCrear: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/api/v1/solicitudes/artes`, objetoCrear);
  }

  createBranchOfficeEvent(objetoCrear: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/api/v1/solicitudes/eventos`, objetoCrear);
  }

  createBranchOfficePodcast(objetoCrear: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/api/v1/solicitudes/podcast`, objetoCrear);
  }

  createBranchOfficeVideo(objetoCrear: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/api/v1/solicitudes/videos`, objetoCrear);
  }
  

  updateBranchOffice(branchOfficeObj: IUpdateBranchOffice): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/api/v1/branch-offices`, branchOfficeObj);
  }

  deleteBranchOffice(idBranchOffice: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/api/v1/branch-offices/${idBranchOffice}`);
  }

  getBranchOfficesById(idBranchOffice: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/v1/branch-offices/${idBranchOffice}`);
  }

  getBranchOfficesListByIdEnterprise(idEnterprise: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/v1/branch-offices/list/${idEnterprise}`);
  }


  getSolicitudesPageable(paramsObj: any): Observable<any> {
    let params = new HttpParams;

    for (let key in paramsObj) {
      if (paramsObj.hasOwnProperty(key)) {
        params = params.set(key, paramsObj[key]);
      }
    }

    return this.httpClient.get<any>(`${this.apiUrl}/api/v1/solicitudes`,  { params });
  }

  getFilesByIdSolicitud(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/v1/solicitudes/get-files/${id}`);
  }

  getCharInfo(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/v1/solicitudes/char-info`);
  }

  getUserCharInfo(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/v1/solicitudes/user-char-info`);
  }

  
  getSolicitudById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/v1/solicitudes/solicitud/${id}`);
  }

}
