import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string; 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
    if (JSON.parse(localStorage.getItem('userData')) && JSON.parse(localStorage.getItem('userData')).token) {
       this.token = JSON.parse(localStorage.getItem('userData')).token; // you probably want to store it in localStorage or something
    }
        
    if (!this.token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', this.token),
    });

    return next.handle(req1);
  }

}
