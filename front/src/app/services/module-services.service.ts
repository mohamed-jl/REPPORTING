import { Injectable } from '@angular/core';
import { Module } from '../../model/Module';
import { Observable, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubModule } from '../../model/SubModule';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleServicesService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  public getAllModules ():Observable<Module[]>{
    return this.http.get<Module[]>(`${this.apiUrl}/module/list`);
  }

  public addModule(module:any):Observable<Object>{
    return this.http.post(`${this.apiUrl}/module/add`,module);
  }
  public deleteModule(id:any){
    return this.http.delete(`${this.apiUrl}/module/delete/`+id);
  }

  public updateModule(module:any,id:number):Observable<Object>{
    return this.http.put(`${this.apiUrl}/module/edit/${id}`,module);
  }
}
