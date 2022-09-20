import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';

import { Movie } from 'src/app/core/models/interfaces';

@Component({
  selector: 'app-pair-slides',
  templateUrl: './pair-slides.component.html',
  styleUrls: ['./pair-slides.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PairSlidesComponent implements OnInit {
  @ViewChild('swiper') swiper: SwiperComponent;
  @Input() movies: Movie[] = [];
  @Output() loadMore = new EventEmitter();

  swiperConfig: SwiperOptions = {
    slidesPerView: 2.3,
  };

  constructor() {}

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }
}
