import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(@Inject(LOCALE_ID) public locale: string) {};

    intercept(req: HttpRequest< any >, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(this.locale);

        req = req.clone({ headers: req.headers.set('Accept-Language', this.locale) });
        return next.handle(req);
    }

}
