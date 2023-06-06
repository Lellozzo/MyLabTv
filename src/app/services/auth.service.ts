import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoggedUser, LoginDto, RegisterDto } from 'src/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  private readonly profileSource$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  readonly profile$: Observable<any> = this.profileSource$.asObservable();

  isLogged: boolean = false
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  
  
  constructor(private http: HttpClient) { 
    
  }
  

  
  ngOnInit(): void {}

  //Registrazione

  register(user: RegisterDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "register", user);
  }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  setLoggedUser(user: LoggedUser) {
    // scrive LoggedUser nel Local Storage
    localStorage.setItem("user", JSON.stringify(user));
  }


  getLoggedUser(): LoggedUser | null {
    let userStorage = localStorage.getItem("user");

    if (userStorage != null) {
      let user: LoggedUser = JSON.parse(userStorage);
      this.setLoggedIn(true);
      return user;
    } else {
      return null;
    }
  }


  login(user: LoginDto): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(environment.USER_API_BASE_URL + "login", user).pipe(
      tap((profile: any) => {
        this.setLoggedIn(true);
        this.profileSource$.next(profile);
      })
    );
  }


  logout(): void {
    localStorage.removeItem('user');
    this.setLoggedIn(false);
  }

  IsLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }



}