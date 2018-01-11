import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from 'selenium-webdriver/http';

@Injectable()
export class AuthentificationService {

    // private currentUser: Subject<User> = new Subject<User>();
    // private baseUrl = '/api/sessions';
    //
    // constructor(private http: HttpClient) {
    // }
    //
    // public authenticate(username: string, password: string): Observable<User> {
    //     const authPayload = {
    //         principal: {name: username, passwordHash: Md5.appendStr(password) }
    //     };
    //     this.http.post(this.baseUrl, authPayload)
    //         .map((result: any) => result.principal)
    //         .subscribe(
    //             (user: User) => {
    //                 this.currentUser.next(user);
    //             }, (error) => {
    //                 this.currentUser.next(null);
    //             }
    //         );
    //     return this.current();
    // }
    //
    // public current(): Observable<User> {
    //     return this.currentUser.asObservable();
    // }
    //
    // public logout(): void {
    //     this.http.delete(this.baseUrl + '/current').subscribe(() => {
    //         console.log('session destroyed');
    //         this.currentUser.next(null);
    //     });
    // }
}
