import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { IonRefresher } from '@ionic/angular';
import { Movie } from '../core/models/interfaces';
import { MoviesService } from '../core/services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Tab1Page implements OnInit {
  @ViewChild('refresher') refresher: IonRefresher;

  currentMovies: Movie[] = [];
  popularMovies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getFeature().subscribe((res) => {
      this.currentMovies = res.results;
    });

    this.getPopular();
  }

  loadMore(event: Event) {
    this.getPopular();
  }

  getPopular() {
    this.moviesService.getPopularMovies().subscribe((res) => {
      this.popularMovies = [...this.popularMovies, ...res.results];
    });
  }

  doRefresh() {
    this.moviesService.getFeature().subscribe((res) => {
      this.currentMovies = res.results;
    });

    this.getPopular();
    this.refresher.complete();
  }
}
