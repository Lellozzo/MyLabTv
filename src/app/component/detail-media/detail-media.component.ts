import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MediaService } from 'src/app/services/media.service';
import { MediaDetail, MovieDetail, SimilarFilm, SimilarTv, TvDetail, Video } from 'src/models/movie';

@Component({
  selector: 'app-detail-media',
  templateUrl: './detail-media.component.html',
  styleUrls: ['./detail-media.component.css']
})
export class DetailMediaComponent implements OnInit {
  
  mediaDetail!: MediaDetail 
  filmDetail?: MovieDetail
  tvDetail?: TvDetail
  similar?: SimilarFilm
  similarMedia: (SimilarFilm | SimilarTv)[] = [];
  mediaType?: string = ""
  trailer?: Video[] = []
  isVideo: boolean = false
  isMovie: boolean = false
  videoUrl: SafeResourceUrl = ""
  videoKey?: string = ""

  loaded:boolean = false;
 
 mediaId?: number
 logged: boolean = false
  
  

  constructor(private mediaService: MediaService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router, private authService: AuthService){
    
  }
  

ngOnInit(): void {
    this.getAll(this.mediaId);
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.logged = isLoggedIn;
    });
}

getAll(ids:number| any ){
  let id = this.route.snapshot.paramMap.get('id');
  let mediaType = this.route.snapshot.url[0].path === 'film' ? 'movie' : 'tv';

  if (id && mediaType) {
    const mediaId = parseInt(id, 10);

    forkJoin({
    
      mediaDetails: this.mediaService.getMediaDetailsAndVideos(mediaType, mediaId),
      video: this.mediaService.getVideo(mediaType, mediaId),
      similar: this.mediaService.getSimilar(mediaType, mediaId)
    }).pipe(
      tap({
        error: error => console.log('Errore:', error)
      })
    ).subscribe(response => {
      // console.log(response)
      const { mediaDetails, video, similar} = response;
      // console.log(video)
      // console.log(response)
      // console.log(similar)
      this.loaded = true
      
      
      if (mediaType === 'movie') {
        this.mediaDetail = mediaDetails [0] as MovieDetail
        this.filmDetail = mediaDetails [0]as MovieDetail
        this.similarMedia = similar?.results as SimilarFilm []
        this.isMovie = true
        
      } else {
        this.mediaDetail = mediaDetails[0] as TvDetail;
        this.tvDetail = mediaDetails[0] as TvDetail;
        this.similarMedia = similar?.results as SimilarTv []
      }

      this.loaded = true;
      if(response.video.results.length >0){
      this.trailer = video.results;
      const videoId = this.trailer![0]?.key;
      const url = `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    });
  }
}

play() {
  this.isVideo = true;
  
}

closeVideo(){
  this.isVideo = false
}
 
getTypeTitle(sm: SimilarFilm | SimilarTv): string {
  if ('title' in sm) {
    return (sm as SimilarFilm).title;
  } else {
    return (sm as SimilarTv).name;
  }
}

getPosterPath(sm: SimilarFilm | SimilarTv): string {
  if ('poster_path' in sm && sm.poster_path) {
    return 'https://image.tmdb.org/t/p/w500' + sm.poster_path;
  } else {
    return "../../../assets/img/LocandinaMancante.png"; // Inserisco il percorso del poster di default per poster mancante
  }
}


goToDetails(id: number) {
  const mediaType = this.isMovie ? 'film' : 'tv';
  let ids = this.route.snapshot.paramMap.get('id');
  this.mediaId = id
  const url = `/${mediaType}/${id}`;
  console.log(url);
  this.router.navigate([url])
  this.loaded=false
  this.isVideo= false
  setTimeout(() => {
    
    this.getAll(ids)
  }, 800); 

  console.log('Dopo il setTimeout, ma prima del ritardo effettivo');
}
 
acquista(med: MediaDetail | SimilarFilm | SimilarTv ) {
  this.mediaService.buy(med)?.subscribe(m => {
    console.log(m);
  })
}  


      
}

    


  






