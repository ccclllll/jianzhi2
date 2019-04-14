import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UrlConfig } from './url.config';
import {User} from "../domain/User";
const BASEURL = UrlConfig.BASEURL;

@Injectable()
export class AuthService {

  token: Subject<any>;


  constructor(private http: HttpClient) {
    this.token = new Subject<any>();
  }

  getToken(userVM: any): Observable<any> {

    return this.http.post(`${BASEURL}/api/authenticate`, userVM).pipe(
      tap(it => this.handleResult(it, userVM))
    );

  }

  handleResult(it: any, userVM: any) {
    this.token.next(it);
    console.log(it);
    localStorage.setItem('token', it.token);

   // console.log(userVM.code)
    const date = (new Date()).getTime();
    localStorage.setItem('loginTime', date + '');
    localStorage.setItem('userVM', JSON.stringify(userVM));
    localStorage.setItem('user', JSON.stringify(it.user));
  }

  getUser(): Observable<any> {
    return this.http.get(`${BASEURL}/api/jwt_user`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${BASEURL}/api/user?id=${id}`);
  }

  clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userVM');
  }

  register(user: User): Observable<any> {
    return this.http.post(`${BASEURL}/api/register`,user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${BASEURL}/api/user`, user);
  }

}
