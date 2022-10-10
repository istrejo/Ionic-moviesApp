import { Component, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { observable, Observable } from 'rxjs';
import { map, debounce, finalize, debounceTime, retry } from 'rxjs/operators';
import { Movie } from '../core/models/interfaces';
import { MoviesService } from '../core/services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  @ViewChild(IonSearchbar) serachBar: IonSearchbar;
  searchedMovies: Observable<Movie[]>;
  findText: string = '';
  ideas: string[] = [
    'Spide-Man',
    'La Vida es Bella',
    'Thor Love and Thunder',
    'The Batman',
  ];
  searching: boolean = false;

  constructor(private movieService: MoviesService) {}

  search() {
    console.log('buscando');
    this.searching = true;
    this.findText = this.serachBar.value;
    if (!this.findText || this.findText === ' ') {
      this.searchedMovies = new Observable();
      this.searching = false;
      return;
    }

    this.searchedMovies = this.movieService.searchMovie(this.findText).pipe(
      debounceTime(800),
      map((data) => data.results),
      finalize(() => (this.searching = false))
    );
  }

  showDetail(id: number) {
    this.movieService.showDetail(id);
  }
}
