import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';

import { Movie } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-pair-slides',
  templateUrl: './pair-slides.component.html',
  styleUrls: ['./pair-slides.component.scss'],
})
export class PairSlidesComponent implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  @Input() movies: Movie[] = [];

  swiperConfig: SwiperOptions = {
    slidesPerView: 2.3,
  };

  constructor() {}

  ngOnInit() {}
}
