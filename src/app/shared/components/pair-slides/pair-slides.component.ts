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
import { DetailComponent } from '../detail/detail.component';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onClick() {
    this.loadMore.emit();
  }

  async showDetail(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id,
      },
    });

    modal.present();
  }
}
