import { Component, OnInit } from '@angular/core';
import { Genre, MovieDetail } from '../core/models/interfaces';
import { LocalDataService } from '../core/services/local-data.service';
import { MoviesService } from '../core/services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  movies: MovieDetail[] = [];
  genres: Genre[] = [];

  constructor(
    private localDataService: LocalDataService,
    private movieService: MoviesService
  ) {}

  async ngOnInit() {
    this.movies = await this.localDataService.loadFavorites();
    this.genres = await this.movieService.loadGenres();
  }

  filterByCategory(genre: string) {
    const filteredArray = this.movies.filter((m) => {
      for (const g of m.genres) {
        if (g.name === genre) return m;
      }
    });
    return filteredArray;
  }
}
