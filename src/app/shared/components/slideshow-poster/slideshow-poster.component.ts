import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { SwiperComponent } from 'swiper/angular';
// import { SwiperOptions } from 'swiper';
import { Movie } from 'src/app/core/models/interfaces';
import { SwiperOptions } from 'swiper';
import { ModalController } from '@ionic/angular';
import { DetailComponent } from '../detail/detail.component';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  @Input() movies: Movie[] = [];

  swiperConfig: SwiperOptions = {
    slidesPerView: 2.3,
  };

  constructor(private movieService: MoviesService) {}

  ngOnInit() {}

  showDetail(id: number) {
    this.movieService.showDetail(id);
  }
}
