import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  IonRefresher,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { LoadingService } from 'src/app/core/loading.service';
import { Cast, MovieDetail } from 'src/app/core/models/interfaces';
import { MoviesService } from 'src/app/core/services/movies.service';
import { SwiperOptions } from 'swiper';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @ViewChild('refresher') refresher: IonRefresher;

  @Input() id: number;
  movie: MovieDetail = {};
  actors: Cast[] = [];
  hidden: number = 150;
  more: boolean = false;
  favorite: boolean = false;
  loading: boolean = false;

  swiperConfig: SwiperOptions = {
    slidesPerView: 3.3,
    freeMode: true,
  };

  constructor(
    private modalCtrl: ModalController,
    private moviesService: MoviesService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.loading = true;
    const loader = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circles',
    });

    loader.present();
    this.getDetail();

    this.moviesService.getActors(this.id).subscribe(({ cast }) => {
      this.actors = cast;
      this.loading = false;
      loader.dismiss();
    });
  }

  getDetail() {
    this.moviesService.getDetail(this.id).subscribe((res) => {
      this.movie = res;
    });
  }

  onClick() {
    this.modalCtrl.dismiss();
  }

  readMore() {
    this.more = !this.more;

    this.more
      ? (this.hidden = this.movie.overview.length)
      : (this.hidden = 150);
  }

  addFavorite() {
    this.favorite = !this.favorite;
  }

  doRefresh() {
    this.getDetail();

    this.moviesService.getActors(this.id).subscribe(({ cast }) => {
      this.actors = cast;
      this.loading = false;
      console.log(cast);
      this.refresher.complete();
    });
  }
}
