import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const urlRegex = /\/api\/width\/[a-zA-Z0-9\-]+/;
const throttleLimit = 3;

@Injectable({
  providedIn: 'root',
})
export class ApiThrottleService {
  constructor() {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (urlRegex.test(req.url)) {
      // handle throttling here
    } else {
      next.handle(req);
    }
  }
}
