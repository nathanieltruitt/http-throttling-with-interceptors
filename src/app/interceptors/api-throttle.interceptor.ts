import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiThrottleService } from '../services/api-throttle.service';
import { Observable } from 'rxjs';

@Injectable()
export class ApiThrottleInterceptor implements HttpInterceptor {
  constructor(private apiThrottleService: ApiThrottleService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.apiThrottleService.intercept(req, next);
  }
}
