import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MediaService } from 'src/app/services/media.service';
import { MediaAcquistato, MediaDetail, MediaI, Movie, SimilarFilm, SimilarTv, Tv } from 'src/models/movie';
import { LoggedUser } from 'src/models/users';

@Component({
  selector: 'app-cineteca',
  templateUrl: './cineteca.component.html',
  styleUrls: ['./cineteca.component.css']
})
export class CinetecaComponent implements OnInit {
  
  mediaAcquistati: MediaAcquistato[]= []
  username: string = ""
  loggedUser = this.authService.getLoggedUser();
  
 
 constructor(private route: ActivatedRoute, private authService: AuthService, private mediaService: MediaService){}
  

ngOnInit(): void {
  
  const loggedUser = this.authService.getLoggedUser();
  if (loggedUser) {
    const userId = loggedUser.user.id;
    this.username = loggedUser.user.username
    this.mediaService.getMediaAcquistati(userId).subscribe(mediaAcquistati => {
      this.mediaAcquistati = mediaAcquistati;
      
      console.log("ciao", mediaAcquistati)
    });
  }
}

getTypeTitle(am: MediaI | MediaDetail | SimilarFilm | SimilarTv | MediaAcquistato): string {
  if ('title' in am) {
    return (am as SimilarFilm).title;
  } else {
    return (am as SimilarTv).name;
  }
}

getPosterPath(sm: SimilarFilm | SimilarTv | MediaAcquistato | MediaI | MediaDetail): string {
  if ('poster_path' in sm && sm.poster_path) {
    return 'https://image.tmdb.org/t/p/w500' + sm.poster_path;
  } else {
    return "../../../assets/img/LocandinaMancante.png"; // Inserisco il percorso del poster di default per poster mancante
  }
}


deleteMedia(mediaId: number) {
  this.mediaService.reso(mediaId)!.subscribe(
    () => {
      let userId = this.loggedUser?.user.id
      // L'eliminazione è avvenuta con successo
      this.mediaService.getMediaAcquistati(userId!).subscribe(mediaAcquistati => {
        this.mediaAcquistati = mediaAcquistati;
    })},
    (error) => {
      // Si è verificato un errore durante l'eliminazione del media
      console.error("Si è verificato un errore durante l'eliminazione del media:", error);
    }
  );
}

}
