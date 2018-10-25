import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME } from './../_shared/var.constant';
import { Signo } from './../_model/signo';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignoService {

  signoCambio = new Subject<Signo[]>();
  mensajeCambio = new Subject<string>();

  url:string = `${HOST}/signos`

  constructor(private http: HttpClient) { }

  listar(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Signo[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarPageable(p:number, s:number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Signo[]>(`${this.url}/pageable?page=${p}&size=${s}`,{
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  listarSignoPorId(id:number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Signo>(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  registarSigno(signo:Signo){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, signo, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  modificarSigno(signo:Signo){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, signo, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }

  eliminarSigno(id:number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/${id}`,{
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    })
  }
}
