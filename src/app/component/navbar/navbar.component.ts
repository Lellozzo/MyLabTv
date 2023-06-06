import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
// TITOLO APP - OnInit => modalità environments Dev o Prod
title: string = "";
backgroundColor: string = 'transparent';
// gestione colori link attivi
activeLink: string = 'home';
// gestione colore navbar con dropdownmenu attivo
public isDropdownOpen: boolean = false;
profilemenu: boolean = false

logged: boolean = false

loggedUser = this.authService.getLoggedUser();


constructor(private navbarService: NavbarService, private authService: AuthService) {

}

  ngOnInit(): void {
    this.loggedUser = this.authService.getLoggedUser();
    this.title = environment.TITOLO
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.logged = isLoggedIn;
    });

  }
  
 
@HostListener('window:scroll', ['$event'])
onWindowScroll(event: any) {
  if (this.isDropdownOpen) {
    this.backgroundColor = 'black';
    return;
  }

  if (window.pageYOffset > 50) {
    this.backgroundColor = 'black';
  } else {
    this.backgroundColor = 'transparent';
  }
}

    navBarBlack(){
      this.backgroundColor = 'black'
    }
      

    asideOpen(){
      this.navbarService.toggleAside();
    }

    logout(){
      console.log("click")
      this.authService.logout()
    }

    openprofilemenu(){
      this.profilemenu = !this.profilemenu
    }
  }
  

