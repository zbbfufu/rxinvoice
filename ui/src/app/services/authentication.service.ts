import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationService {

    private currentUser: Subject<User> = new Subject<User>();
    private baseUrl = '/api/sessions';

    constructor(private router: Router, private http: HttpClient) {
    }

    public authenticate( login: string, password: string): Observable<User> {
        const md5 = new Md5().appendStr(password).end();
        const authPayload = {principal: { name: login, passwordHash: md5}};
        console.log(md5);
        this.http.post( this.baseUrl, authPayload, { withCredentials: true})
            .subscribe(
                (user: User) => {
                    this.currentUser.next(user);
                }, () => {
                    this.currentUser.next(null);
                }
            );
        return this.current();
    }

    public current(): Observable<User> {
        return this.currentUser.asObservable();
    }

    public isLogin(): Observable<User> {
        this.http.get(this.baseUrl + '/current')
            .subscribe(
                (user: User) => {
                    return true;
                }, (error) => {
                    this.currentUser.next(null);
                    return false;
                }
            );
        return this.current();
    }

    public logout(): void {
        this.http.delete(this.baseUrl + '/current').subscribe(() => {
            console.log('session destroyed');
            this.currentUser.next(null);
            this.router.navigate(['/login']);
        });
    }
}
