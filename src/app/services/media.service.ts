import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MediaAcquistato, MediaDetail, Movie, PersonDetail, ResponseMovie, ResponsePerson, ResponseTv, SimilarFilm, SimilarMediaResponse, SimilarTv, Tv, Video, VideoResponse } from 'src/models/movie';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiKey = environment.API_KEY
  private url = environment.BASE_URL

  constructor(private http: HttpClient, private authService: AuthService) { }

  //Get Movie e Series e Person Trending in Italia
  getTrending(cat: string, timeWindow: string, region: string): Observable<ResponseMovie | ResponseTv | ResponsePerson>{
    const params = new HttpParams({
      fromObject: {
        api_key: this.apiKey,
        language: 'it-US',
        page: '1',
        region: region
      }
    });
    return this.http.get<ResponseMovie | ResponseTv | ResponsePerson>(`${this.url}/trending/${cat}/${timeWindow}`, {params}) as Observable<ResponseMovie | ResponseTv | ResponsePerson>
}


getVideo(mediaType: string, mediaId: number): Observable<VideoResponse> {
  const params = new HttpParams({
    fromObject: {
      api_key: this.apiKey,
      language: 'it-US'
    }
  });

  const url = mediaType === 'movie' 
    ? `${this.url}/movie/${mediaId}/videos`
    : `${this.url}/tv/${mediaId}/videos`;

  return this.http.get<VideoResponse>(url, { params }).pipe(
    switchMap((response: VideoResponse) => {
      if (response.results.length > 0) {
        return of(response); // Restituisco i trailer in italiano se disponibili
      } else {
        // Sovrascrivo il valore del parametro "language" con "en-US" per rifare la chiamata in lingua inglese
        const englishParams = params.set('language', 'en-US');

        // Effettuo una seconda chiamata per ottenere i trailer in lingua inglese
        // const englishUrl = mediaType === 'movie' 
        //   ? `${this.url}/movie/${mediaId}/videos`
        //   : `${this.url}/tv/${mediaId}/videos`;

        return this.http.get<VideoResponse>(url, { params: englishParams });
      }
    }),
    catchError(() => {
      // Gestisco l'errore se entrambe le chiamate non restituiscono trailer
      return throwError('Nessun trailer disponibile');
    })
  );
}

// ottengo i dettagli di un media e i video correlati a esso. Prendo in input il tipo di media (mediaType) e l'ID del media (mediaId), e restituisco un'Observable  contenente i dettagli del media e la risposta dei video. Le due richieste vengono eseguite in parallelo utilizzando l'operatore forkJoin per combinare le due Observable in una singola Observable
getMediaDetailsAndVideos(mediaType: string, mediaId: number): Observable<[MediaDetail, VideoResponse]> {
  const params = new HttpParams({
    fromObject: {
      api_key: this.apiKey,
      language: 'it-US'
    }
  });

  const mediaUrl = `${this.url}/${mediaType}/${mediaId}`;
  const videoUrl = mediaType === 'movie' ? `${this.url}/movie/${mediaId}/videos` : `${this.url}/tv/${mediaId}/videos`;

  const media$ = this.http.get<MediaDetail>(mediaUrl, { params });
  const video$ = this.http.get<VideoResponse>(videoUrl, { params });

  return forkJoin([media$, video$]).pipe(
    catchError(err => {
      console.error('Errore nella chiamata get media details and videos:', err);
      return throwError(err);
    })
  );
}

// ottengo media simili a un determinato media specificato dal tipo (mediaType) e dall'ID (mediaId). Restituisco un'Observable di tipo SimilarMediaResponse
getSimilar(mediaType: string, mediaId: number): Observable<SimilarMediaResponse>{
  const params = new HttpParams({
    fromObject: {
      api_key: this.apiKey,
      language: 'it-US'
    }
  });
  const mediaUrl = `${this.url}/${mediaType}/${mediaId}/similar`;
  return this.http.get<SimilarMediaResponse>(mediaUrl, {params}) as Observable<SimilarMediaResponse>
}

//https://api.themoviedb.org/3/movie/502356/similar?api_key=f2377b272cc6f8ace2cbe5f7ed50509d&language=it-US


// ottengo i dettagli di una persona. effettuo una richiesta HTTP per ottenere i dettagli di una persona da un'API di film. I parametri della richiesta includono la chiave API, la specifica di includere i crediti dei film nella risposta come append to_response e la lingua dei risultati. I dettagli della persona sono restituiti come un'Observable<PersonDetail> 
getPersonDetail(mediaType: string, personId: number, language: string = 'it-US'): Observable<PersonDetail> {
  const params = new HttpParams({
    fromObject: {
      api_key: this.apiKey,
      append_to_response: 'movie_credits',
      language: language
    }
  });
  const mediaUrl = `${this.url}/${mediaType}/${personId}`;
  return this.http.get<PersonDetail>(mediaUrl, { params }).pipe(
    catchError((error: any) => {
      console.error('Errore durante la richiesta di dettagli persona:', error);
      return throwError('Errore durante il recupero dei dettagli della persona.');
    })
  );
}

// ricerca di film in base a una parola chiave. Eseguo una ricerca di film utilizzando una parola chiave fornita come input. La richiesta viene inviata all'API dei film con i parametri specificati e i risultati della ricerca vengono restituiti come un'Observable<ResponseMovie>
getSearch(searchWord: string): Observable<ResponseMovie> {
  const params = new HttpParams({
    fromObject: {
      api_key: this.apiKey,
      language: 'it-US',
      query: encodeURI(searchWord),
      page: '1',
      include_adult: 'false'
    }
  });
  const mediaUrl = `${this.url}/search/movie`;

  return this.http.get<ResponseMovie>(mediaUrl, { params });
}

// acquisto di un media, come un film, una serie TV o un dettaglio di un media simile. Controllo se l'utente è autenticato, creo un oggetto che rappresenta il media acquistato e invio una richiesta HTTP POST al server per aggiungere il media alla "cineteca" dell'utente 
buy(media: Movie | Tv | MediaDetail | SimilarFilm | SimilarTv) {
  let loggedUser = this.authService.getLoggedUser();
  if (loggedUser != null) {
    let mediaAcquistato: MediaAcquistato = {
      user: loggedUser.user,
      userId: loggedUser.user.id,
      media: media
    };
    return this.http.post<MediaAcquistato>(environment.USER_API_BASE_URL + "cineteca", mediaAcquistato, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + loggedUser.accessToken
      })
    });
  }
  return null;
}

// recupero i media acquistati per un determinato utente.
getMediaAcquistati(userId: number): Observable<MediaAcquistato[]> {
  const loggedUser = this.authService.getLoggedUser();
 if (loggedUser) {
   const userId = loggedUser.user.id;
   const token = loggedUser.accessToken;
  return this.http.get<MediaAcquistato[]>(environment.USER_API_BASE_URL + "cineteca?userId=" + loggedUser.user.id, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${token}`
    })
  });
} return of([])
}


reso(mId: number): Observable<MediaAcquistato[]> {
  const loggedUser = this.authService.getLoggedUser();
 if (loggedUser) {
   const token = loggedUser.accessToken;
  return this.http.delete<MediaAcquistato[]>(environment.USER_API_BASE_URL + "cineteca/" + mId, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${token}`
    })
  });
} return of([])
}




}
