import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { MovieDetailComponent } from './component/movie-detail/movie-detail.component';
import { ContattiComponent } from './component/contatti/contatti.component';
import { HomeCarouselTrendingMovieComponent } from './component/home-carousel-trending-movie/home-carousel-trending-movie.component';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MovieDetailComponent,
    ContattiComponent,
    HomeCarouselTrendingMovieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
