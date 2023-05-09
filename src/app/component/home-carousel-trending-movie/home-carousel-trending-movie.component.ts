import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home-carousel-trending-movie',
  templateUrl: './home-carousel-trending-movie.component.html',
  styleUrls: ['./home-carousel-trending-movie.component.css']
})
export class HomeCarouselTrendingMovieComponent implements OnInit {
 trendingMovies: any;

 constructor(private movieService: MovieService){}
 
 
 
  ngOnInit(): void {
   this.movieService.getTrendingMovies().subscribe(data => {
    this.trendingMovies = data.results;
    console.log(data)
   })
  }

}
