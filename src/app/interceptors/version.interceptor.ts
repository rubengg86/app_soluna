import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import packageJson from '../../../package.json';

@Injectable()
export class VersionInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const versioned = req.clone({
      setHeaders: { 'X-App-Version': packageJson.version }
    });
    return next.handle(versioned);
  }
}
