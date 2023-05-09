import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiKey = environment.API_KEY
  private url = environment.BASE_URL

  constructor(private http: HttpClient) { }

  // Get Movie Trending Italy
  getTrendingMovies(): Observable<any>{
let params = new HttpParams();
params = params.append('api_key', this.apiKey);
params = params.append('region', 'IT');

return this.http.get(`${this.url}/trending/movie/week`, {params: params})
  }
}
