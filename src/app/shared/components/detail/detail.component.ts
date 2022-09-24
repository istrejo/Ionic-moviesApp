import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { LoadingService } from 'src/app/core/loading.service';
import { Cast, MovieDetail } from 'src/app/core/models/interfaces';
import { MoviesService } from 'src/app/core/services/movies.service';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() id: number;
  movie: MovieDetail = {};
  actors: Cast[] = [];

  hidden: number = 150;

  more: boolean = false;
  favorite: boolean = false;

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
    const loader = await this.loadingCtrl.create({
      message: 'Cargando...',
      spinner: 'circles',
    });

    loader.present();
    this.moviesService.getDetail(this.id).subscribe((res) => {
      console.log(res);
      this.movie = res;
    });
    this.moviesService.getActors(this.id).subscribe(({ cast }) => {
      this.actors = cast;
      loader.dismiss();
      console.log('actores de la pelicula', this.actors);
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
}
