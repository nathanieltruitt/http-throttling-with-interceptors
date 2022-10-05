import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, Subscriber, tap } from 'rxjs';

const urlRegex = /\/api\/width\/[a-zA-Z0-9\-]+/;
const throttleLimit = 3;

@Injectable({
  providedIn: 'root',
})
export class ApiThrottleService {
  private activeCount = 0;
  private reqUrls: string[] = [];
  private reqObs: { [key: string]: Subscriber<any> } = {};
  constructor() {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (urlRegex.test(req.url)) {
      // handle throttling here
      this.removeMatchingUrl(req.url);
      if (this.activeCount < throttleLimit) {
        this.activeCount++;
        return next.handle(req).pipe(
          tap((evt) => {
            if (evt instanceof HttpResponse) {
              this.processResponse();
            }
            return evt;
          }),
          catchError((err) => {
            this.processResponse();
            return of(err);
          })
        );
      } else {
        // do nothing
      }
    } else {
      next.handle(req);
    }
  }

  removeMatchingUrl(url: string): void {
    // remove the url if it matches
    const indx = this.reqUrls.indexOf(url);
    if (indx > -1) {
      this.reqUrls.splice(indx, 1);
      const observer = this.reqObs[url];
      observer.error();
      delete this.reqObs[url];
      if (this.activeCount > 0) {
        this.activeCount--;
      }
    }
  }

  processResponse() {
    if (this.activeCount > 0) {
      this.activeCount--;
    }
    if (this.reqUrls.length > 0) {
      const url = this.reqUrls[0];
      const observer = this.reqObs[url];
      observer.next('done!');
      observer.complete();
      this.reqUrls = this.reqUrls.slice(1);
      delete this.reqObs[url];
    }
  }
}
