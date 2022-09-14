import { Component, Input, OnInit, ViewChild } from '@angular/core';

// Swiper

import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import { Movie } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  @Input() movies: Movie[] = [];

  swiperConfig: SwiperOptions = {
    slidesPerView: 1.1,
  };

  constructor() {}

  ngOnInit() {}
}
