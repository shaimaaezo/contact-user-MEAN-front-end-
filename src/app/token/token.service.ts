import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor{

  constructor() { }

  intercept(req:any, next:any) {
    let tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return next.handle(tokenReq)
  }
}
