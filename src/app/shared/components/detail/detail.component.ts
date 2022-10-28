import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  IonRefresher,
  LoadingController,
  ModalController,
} from '@ionic/angular';
// import { LoadingService } from 'src/app/core/loading.service';
import { Cast, MovieDetail } from 'src/app/core/models/interfaces';
import { LocalDataService } from 'src/app/core/services/local-data.service';
import { MoviesService } from 'src/app/core/services/movies.service';
import { SwiperOptions } from 'swiper';

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
    private localDataservice: LocalDataService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const exists = await this.localDataservice.movieExists(this.id);
    this.favorite = exists;

    const loader = await this.loadingCtrl.create({
      message: 'Loading',
      spinner: 'bubbles',
    });

    await loader.present();
    this.loading = true;
    this.getDetail();

    this.localDataservice.getData().then((data) => {
      for (const m of data) {
        if (m.id === this.movie.id) {
          this.favorite = true;
          break;
        }
      }
    });

    this.moviesService.getActors(this.id).subscribe(({ cast }) => {
      this.actors = cast;
      this.loading = false;
      this.loadingCtrl.dismiss();
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
    // // this.favorite = !this.favorite;
    this.localDataservice
      .saveMovie(this.movie)
      .then((exists) => (this.favorite = exists));
  }

  doRefresh() {
    this.getDetail();

    this.moviesService.getActors(this.id).subscribe(({ cast }) => {
      this.actors = cast;
      this.loading = false;
      this.refresher.complete();
    });
  }
}
