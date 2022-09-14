import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Movie } from '../core/models/interfaces';
import { MoviesService } from '../core/services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Tab1Page implements OnInit {
  currentMovies: Movie[] = [];
  popularMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getFeature().subscribe((res) => {
      this.currentMovies = res.results;
    });

    this.moviesService.getPopularMovies().subscribe((res) => {
      console.log('Populares', res);
      this.popularMovies = res.results;
    });
  }
}
