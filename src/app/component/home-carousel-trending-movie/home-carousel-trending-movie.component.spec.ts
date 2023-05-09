import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCarouselTrendingMovieComponent } from './home-carousel-trending-movie.component';

describe('HomeCarouselTrendingMovieComponent', () => {
  let component: HomeCarouselTrendingMovieComponent;
  let fixture: ComponentFixture<HomeCarouselTrendingMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCarouselTrendingMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCarouselTrendingMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
