import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { group_module } from 'src/model/group_module';
import { FormGroup,FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GroupModuleService {
  apiUrl = environment.apiUrl
  
  constructor(private http : HttpClient) { }

  public getGroup ():Observable<group_module[]>{
    return this.http.get<group_module[]>(`${this.apiUrl}/group/list`);
  }

  public addGroup(group:group_module):Observable<Object>{
    return this.http.post(`${this.apiUrl}/group/add`,group);
  }

  public deleteGroup(id:any){
    return this.http.delete(`${this.apiUrl}/group/delete/`+id);
  }

  public getGroupById(id:any):Observable<group_module>{
    return this.http.get<group_module>(`${this.apiUrl}/group/`+id);
  }

  public updateGroup(group:any,id:number):Observable<Object>{
    return this.http.put(`${this.apiUrl}/group/edit/${id}`,group);
  }


  public addModuleToGroup(groupId: number, moduleId: number) {
    const url = `${this.apiUrl}/group/${groupId}/modules/${moduleId}`;
    return this.http.post(url, {});
  }

  public addFonctionToGroup(groupId: number, functionId: number) {
    const url = `${this.apiUrl}/group/${groupId}/functions/${functionId}`;
    return this.http.post(url, {});
  }

 public getModulesByGroup(groupId: any){
  const url = `${this.apiUrl}/group/${groupId}/modules`
  return this.http.get(url)

 }

 public getFunctionsByGroup(groupId: any){
  const url = `${this.apiUrl}/group/${groupId}/Functions`
  return this.http.get(url)
 }

 removeFunctionFromGroup( groupId:any,  functionId:any){

  const url = `${this.apiUrl}/group/${groupId}/functions/${functionId}`
  return this.http.delete(url)


 }

 removeModuleFromGroup( groupId:any,  moduleId:any){

  const url = `${this.apiUrl}/group/${groupId}/modules/${moduleId}`
  return this.http.delete(url)


 }
  
}
