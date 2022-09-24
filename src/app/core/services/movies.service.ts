import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  CreditsResponse,
  MovieDetail,
  ResponseMDB,
} from '../models/interfaces';
import { environment } from 'src/environments/environment';

const { url, api_key } = environment;

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private popularPage: number = 0;

  constructor(private http: HttpClient) {}

  private executeQuery<T>(query: string) {
    const params = new HttpParams()
      .set('language', 'es')
      .set('include_image_language', 'es')
      .set('api_key', api_key);

    query = url + query;

    return this.http.get<T>(query, { params });
  }

  getFeature() {
    const today = new Date();
    const lastDay = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    ).getDate();
    const month = today.getMonth();

    let monthString;

    if (month < 10) {
      monthString = '0' + month;
    } else {
      monthString = month;
    }

    const start = `${today.getFullYear()}-${monthString}-01`;
    const end = `${today.getFullYear()}-${monthString}-${lastDay}`;

    return this.executeQuery<ResponseMDB>(
      `/discover/movie?primary_release_date.gte=${start}&primary_release_date.lte=${end}`
    );
  }

  getPopularMovies() {
    this.popularPage++;

    const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularPage}`;

    return this.executeQuery<ResponseMDB>(query);
  }

  getDetail(id: number) {
    return this.executeQuery<MovieDetail>(`/movie/${id}?a=1`);
  }

  getActors(id: number) {
    return this.executeQuery<CreditsResponse>(`/movie/${id}/credits?a=1`);
  }
}
