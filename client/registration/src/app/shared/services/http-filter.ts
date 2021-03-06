import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlConfig } from './url.config';

const BASEURL = UrlConfig.BASEURL;
@Injectable()
export class HttpFilter implements HttpInterceptor {

  BASEURL: String = 'http://localhost:8088';
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url !== `${BASEURL}/api/authenticate` && localStorage.getItem('token')) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
    // console.log(request)
    return next.handle(request);
  }
}
