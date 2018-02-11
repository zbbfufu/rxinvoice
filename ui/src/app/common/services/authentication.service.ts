import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import {User} from '../../models/user.model';

@Injectable()
export class AuthenticationService {

  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  private onAuth: Subject<User> = new Subject<User>();
  private baseUrl = '/api/sessions';

  constructor(private router: Router,
              private http: HttpClient) {
  }

  public authenticate(login: { name: string, password: string }): Observable<User> {
    const md5 = new Md5().appendStr(login.password).end();
    const authPayload = {principal: {name: login.name, passwordHash: md5}};
    this.http.post(this.baseUrl, authPayload, {withCredentials: true})
      .map((result: any) => result.principal)
      .subscribe(
        (user: User) => {
          this.currentUser.next(user);
          this.onAuth.next(user);
        }, (error) => {
          this.onAuth.next(null);
        }
      );
    return this.onAuthentication();
  }

  public fetchCurrent(): Observable<User> {
    return this.http.get(this.baseUrl + '/current', { withCredentials: true })
      .map((result: any) => result.principal)
      .do(
        (user: User) => this.currentUser.next(user),
        () => this.currentUser.next(null)
      );
  }

  public current(): User {
    return this.currentUser.getValue();
  }

  public onAuthentication(): Observable<User> {
    return this.onAuth.asObservable();
  }

  public logout(): void {
    this.http.delete(this.baseUrl + '/current').subscribe(() => {
      console.log('session destroyed');
      this.currentUser.next(null);
        this.router.navigate(['/login']);
    });
  }
}
