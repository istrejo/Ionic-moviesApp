import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { SwiperComponent } from 'swiper/angular';
// import { SwiperOptions } from 'swiper';
import { Movie } from 'src/app/core/models/interfaces';
import { SwiperOptions } from 'swiper';

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

  constructor() {}

  ngOnInit() {}
}
