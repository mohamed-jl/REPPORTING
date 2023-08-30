import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubModule } from 'src/model/SubModule';

@Injectable({
  providedIn: 'root'
})
export class SubmoduleService {
  apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  public getAllSubModules ():Observable<SubModule[]>{
    return this.http.get<SubModule[]>(`${this.apiUrl}/submodule/list`);
  }

  public addSubmodule(submodule:any):Observable<Object>{
    return this.http.post(`${this.apiUrl}/submodule/add`,submodule);
  }
  
  public deleteSubModule(id:any){
    return this.http.delete(`${this.apiUrl}/submodule/delete/`+id);
  }
  public updateSubModule(id:number,submodule:any){
    return this.http.put(`${this.apiUrl}/submodule/edit/${id}`,submodule);
  }

  public getSubModuleById(id:number){
    return this.http.get(`${this.apiUrl}/submodule/${id}`);
  }
}
