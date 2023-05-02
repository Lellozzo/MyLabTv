import { Component, HostListener, OnInit } from '@angular/core';
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
isDropdownOpen: boolean = false;

  ngOnInit(): void {
    this.title = environment.TITOLO
  }
  
   
  
    constructor() { }
  
    // Scrolling verticale page e navbar e cambio colore
    // @HostListener('window:scroll', ['$event'])
    // onWindowScroll(event:any) {
    //   if (window.pageYOffset > 50) {
    //     this.backgroundColor = 'black';
    //   } if(window.pageYOffset < 50 && this.isDropdownOpen) {this.backgroundColor= 'black'}
    //   else {
    //     this.backgroundColor = 'transparent';
    //   }
    // }

//     @HostListener('window:scroll', ['$event'])
// onWindowScroll(event: any) {
//   if (window.pageYOffset < 50 && !this.isDropdownOpen) {
//     this.backgroundColor = 'transparent';
//   } else {
//     this.backgroundColor = 'black';
//   }
// }

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
    if (this.isDropdownOpen){
      this.backgroundColor = 'black'
    }
      
    }
  }
  

