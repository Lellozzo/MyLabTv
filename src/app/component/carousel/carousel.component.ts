import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MediaService } from 'src/app/services/media.service';
import { Movie, Person, ResponseMovie, ResponsePerson, ResponseTv, Tv } from 'src/models/movie';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit{
  trendingMedia: any
  // trendingMedia: Movie[] | Tv[] | Person[] = [];
// trendingMedia?:  (Person | Movie  | Tv)[] = []
// trendingMedia: (Movie | Tv | Person)[] = [];
personCarousel: boolean = false
isMovie: boolean = false
isDown: boolean = false;
startX: number | undefined;
scrollLeft: number | undefined;
mediaBuy?: Movie | Tv
logged:boolean = false
@Input() carouselLabel: string= ""
@Input() carouselMedia: string = ""
@Input() carouselTime: string =""
@Input() carouselRegion: string = "IT";
  
  constructor(private mediaService: MediaService, private authService: AuthService){}
  
//accedo all'elemento container delle card per gestire lo scorrimento con le frecce e con il mouse
 @ViewChild('container') container!: ElementRef;


 // scroll con freccia sinistra, con behavior
 prevSlide() {
   this.container.nativeElement.scrollBy({ left: -550, behavior: 'smooth' });
 }
// scroll con freccia destra, con behavior
 nextSlide() {
  console.log("Sposta destra")
   this.container.nativeElement.scrollBy({ left: 550, behavior: 'smooth' });
 }
 // scroll con mouse
 onMouseDown(event: MouseEvent) {
  this.isDown = true;
  this.startX = event.pageX - this.container.nativeElement.offsetLeft;
  this.scrollLeft = this.container.nativeElement.scrollLeft;
}

onMouseMove(event: MouseEvent) {
  if (!this.isDown) return;
  event.preventDefault();
  const x = event.pageX - this.container.nativeElement.offsetLeft;
  const walk = (x - this.startX!) * 2; // Moltiplico per un fattore per rendere lo scorrimento più fluido
  this.container.nativeElement.scrollLeft = this.scrollLeft! - walk;
}

onMouseUp() {
  this.isDown = false;
}

// trending(media:string, time:string, region:string){
// this.mediaService.getTrending(media, time, region).subscribe(data =>{
//   console.log(data)
//   if(data.results.length > 0 && data.results[0].media_type === "person"){
//     console.log(data.results[0].media_type)
//     this.personCarousel = true
// this.trendingMedia = data.results 
// return
//   }
//   this.trendingMedia = data.results;
// })
// }

// trending(media: string, time: string, region: string) {
//   this.mediaService.getTrending(media, time, region).subscribe((data: ResponseMovie | ResponseTv | ResponsePerson)  => {
//     console.log(data);
//     if (data.results.length > 0 && data.results[0].media_type === 'person') {
//       console.log(data.results[0].media_type);
//       this.personCarousel = true;
//       this.trendingMedia = data.results as Person[];
//       return;
//     }
//     this.trendingMedia = data.results as (Movie | Tv)[];
//   });
// }



// trending(media: string, time: string, region: string) {
//   this.mediaService.getTrending(media, time, region).subscribe((data: ResponseMovie | ResponseTv | ResponsePerson)  => {
//     console.log(data);
//     if (data.results.length > 0 && data.results[0].media_type === 'person') {
//       console.log(data.results[0].media_type);
//       this.personCarousel = true;
//       this.trendingMedia = data.results as Person[];
//       return;
//     }
//     this.trendingMedia = data.results as (Movie | Tv)[];
//   });
// }


trending(media: string, time: string, region: string) {
  this.mediaService.getTrending(media, time, region).subscribe((data: ResponseMovie | ResponseTv | ResponsePerson)  => {
    console.log(data);
    console.log(typeof(data))
    if (data.results.length > 0 && data.results[0].media_type === 'person') {
      console.log(data.results[0].media_type);
      this.personCarousel = true;
      this.trendingMedia = data.results as Person[];
      console.log(this.trendingMedia)
      return;
    } else if (data.results.length > 0 && data.results[0].media_type === 'tv'){
    this.trendingMedia = data.results as  Tv[];
    console.log(this.trendingMedia)
  return} else {
    this.trendingMedia = data.results as  Movie[];
    this.isMovie = true
  }
  
  });
}


  ngOnInit(): void {
    this.trending(this.carouselMedia, this.carouselTime, this.carouselRegion)
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.logged = isLoggedIn;
    });
    
  }

  acquista(med: Movie | Tv) {
    this.mediaService.buy(med)?.subscribe(m => {
      console.log(m);
  
     
    })
  }

}
