import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MovieDetail } from '../models/interfaces';

const STORAGE_KEY = 'movies';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  private _storage: Storage | null = null;
  movies: MovieDetail[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.init();
    this.loadFavorites();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'light',
    });

    await toast.present();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async saveMovie(movie: MovieDetail) {
    let exists = false;
    let message = '';

    for (const m of this.movies) {
      if (m.id === movie.id) {
        exists = true;
        break;
      }
    }

    if (exists) {
      this.movies = this.movies.filter((m) => m.id !== movie.id);
      message = 'Removida de favoritos';
      this.presentToast(message);
    } else {
      this.movies.push(movie);
      message = 'Añadida a favoritos';
      this.presentToast(message);
    }

    this.storage.set('movies', this.movies);

    return !exists;
  }

  async loadFavorites() {
    const movies = await this.storage.get(STORAGE_KEY);
    this.movies = movies || [];
    return this.movies;
  }

  async movieExists(id) {
    await this.loadFavorites();
    const exists = this.movies.find((m) => m.id === id);
    return exists ? true : false;
  }

  getData(): Promise<MovieDetail[]> {
    return this.storage.get(STORAGE_KEY);
  }
}
