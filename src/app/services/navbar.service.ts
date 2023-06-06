import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  isAsideOpen$ = new BehaviorSubject<boolean>(false);

  toggleAside() {
    this.isAsideOpen$.next(!this.isAsideOpen$.value);
  }

  constructor() { }
}
