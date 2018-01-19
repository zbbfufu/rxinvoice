import { HttpParams } from '@angular/common/http';

export class SearchParams {

    public static toHttpParams(params): HttpParams {
        if (!params) {
            return new HttpParams();
        }
        return Object
            .getOwnPropertyNames(params)
            .filter(key => params[key] !== null && params[key] !== undefined && params[key] !== '')
            .reduce((p, key) => {
                let value = params[key];
                if (value instanceof Date) {
                    value = value.toISOString();
                } else if (value.getUri) {
                    value = value.getUri();
                }
                return p.set(key, value);
            }, new HttpParams());
    }
}
