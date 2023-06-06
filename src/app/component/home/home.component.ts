import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/services/media.service';
import { NavbarService } from 'src/app/services/navbar.service';
import { Movie, Tv } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
@ViewChild('homeVideo', {static: false}) homeVideo!: ElementRef<HTMLVideoElement>;


mouseMoved: boolean = false;
videoStarted:boolean=false
events:string[] = ['click', 'scroll', 'mousemove']
mostraElemento:boolean = true;
media: string[] = ["", "all", "movie", "tv", "person"];
mediaBuy?: Movie | Tv
time: string[] = ["day", "week"];
search: string = ""
searchRes: Movie[] = [];

@Output()
isOpen: boolean = false


constructor(private elRef: ElementRef, public navbarService:NavbarService, private mediaService: MediaService){}
  

@HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.mostraElemento = window.innerWidth >= 800;
  }
/* FIX
 Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first. h
*/

  ngAfterViewInit(): void {
    for (const e of this.events) {
      document.addEventListener (e, this.onMouseMove.bind(this));
    }
  }


  
ngOnInit(): void {
  this.navbarService.isAsideOpen$.subscribe(Open => {
    this.isOpen = Open;
  });
  }



onMouseMove() {
  this.mouseMoved = true;
  if (!this.videoStarted) {
    this.homeVideo.nativeElement.muted = true;
    this.homeVideo.nativeElement.play();
    this.videoStarted = true;
    
  }
}

getResultsSearch() {
  this.mediaService.getSearch(this.search)
    .subscribe(res => {
      this.searchRes = res.results as Movie[];
      console.log(this.searchRes);
    })
}

getPosterPath(fm: Movie): string {
  if ('poster_path' in fm && fm.poster_path) {
    return 'https://image.tmdb.org/t/p/w500' + fm.poster_path;
  } else {
    return "../../../assets/img/LocandinaMancante.png"; // Inserisco il percorso del poster di default per poster mancante
  }
}



}
