import { EventEmitter, Injectable } from '@angular/core';
import {
  Discover,
  MovieSearch,
  PersonSearch,
  Sort,
  COUNTRIES,
  GENRES,
  RELEASE_TYPES,
  Movie,
} from './movie.model';
import { CustomMethodService } from 'src/app/shared/custom-method.service';
import axios from 'axios';

const TMDB_AUTH =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjY4NTc3ZjI5MWM3NTkzY2M0YjE1ZmMxNDhkZTZkNCIsInN1YiI6IjY0ODM1MGFjZTM3NWMwMDExYzdmM2VlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ThE_Z-h9XD9hq3X3KRP9epFqrSnigE7UtUq2fQ-yo-o';
const TMDB_HEADERS = {
  accept: 'application/json',
  Authorization: TMDB_AUTH,
};
@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  sort: Sort = new Sort('popularity', 'desc', 1);
  discover: Discover = new Discover(this.sort, []);
  movieSearch: MovieSearch = new MovieSearch('', '', null);
  personSearch: PersonSearch = new PersonSearch('', '', 1);

  result_ids: number[] = [];
  movie_results: Movie[] = [];

  // info: Event Emitters
  movieResultsChanged = new EventEmitter<Movie[]>();
  sortChanged = new EventEmitter<Sort>();
  discoverChanged = new EventEmitter<Discover>();
  movieSearchChanged = new EventEmitter<MovieSearch>();
  personSearchChanged = new EventEmitter<PersonSearch>();

  constructor(private customMethod: CustomMethodService) {}

  async getDiscover(discover: Discover) {
    this.discover = discover;
    await fetch(
      `https://api.themoviedb.org/3/discover/movie?${this.discover.toString()}`,
      {
        method: 'GET',
        headers: TMDB_HEADERS,
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err));

    /* 
const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  params: {
    include_adult: 'false',
    include_video: 'false',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjY4NTc3ZjI5MWM3NTkzY2M0YjE1ZmMxNDhkZTZkNCIsInN1YiI6IjY0ODM1MGFjZTM3NWMwMDExYzdmM2VlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ThE_Z-h9XD9hq3X3KRP9epFqrSnigE7UtUq2fQ-yo-o'
  }
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
    */
  }

  async getBasicResults() {
    await this.resetResults();
    await axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/discover/movie',
        params: {
          include_adult: 'false',
          include_video: 'false',
          page: '1',
          'primary_release_date.lte': this.customMethod.today(),
          sort_by: 'primary_release_date.desc',
          'vote_count.gte': '15',
        },
        headers: TMDB_HEADERS,
      })
      .then(async (response) => {
        response.data.results.forEach((movie: any) => {
          this.result_ids.push(movie.id);
        });
      })
      .catch((error: any) => console.log(error));

    this.result_ids.forEach(async (id) => {
      await this.findMovieByID(id);
    });

    this.movieResultsChanged.emit(this.movie_results);
  }

  async getMovieSearch(search: MovieSearch) {
    await this.resetResults();
    const search_year = search.year === null ? '' : search.year.toString();
    await axios
      .request({
        method: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
          query: search.query,
          language: search.language,
          year: search_year,
        },
        headers: TMDB_HEADERS,
      })
      .then(async (response) => {
        const PAGE_COUNT = response.data.total_pages;
        for (let pg = 1; pg <= Math.min(PAGE_COUNT, 2); pg++) {
          await axios
            .request({
              method: 'GET',
              url: 'https://api.themoviedb.org/3/search/movie',
              params: {
                query: search.query,
                language: search.language,
                year: search_year,
                page: pg,
              },
              headers: TMDB_HEADERS,
            })
            .then((response) => {
              response.data.results.forEach((movie: any) => {
                this.result_ids.push(movie.id);
              });
            })
            .catch((error: any) => console.log(error));
        }
      })
      .catch((error: any) => console.log(error));

    this.result_ids.forEach(async (id) => {
      await this.findMovieByID(id);
    });

    this.movieResultsChanged.emit(this.movie_results);
  }

  async findMovieByID(id: number) {
    await axios
      .request({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${id}`,
        headers: TMDB_HEADERS,
      })
      .then((response) => {
        this.movie_results.push(response.data);
      })
      .catch((error: any) => console.log(error));
  }

  async resetResults() {
    this.movie_results = [];
    this.result_ids = [];
    this.movieResultsChanged.emit(this.movie_results);
  }

  // info: Methods that return initial values for the  properties
  initialDiscover() {
    this.discover.reset();
    return this.customMethod.getCopy(this.discover);
  }
  initialMovieSearch() {
    this.movieSearch.reset();
    return this.customMethod.getCopy(this.movieSearch);
  }
  initialPersonSearch() {
    this.personSearch.reset();
    return this.customMethod.getCopy(this.personSearch);
  }
  initialSort() {
    this.sort.reset();
    return this.customMethod.getCopy(this.sort);
  }

  // info: Methods that update the  properties with new values
  updateDiscover(discover: Discover) {
    this.discover = this.customMethod.getCopy(discover);
    this.discoverChanged.emit(this.discover);
  }
  updateMovieSearch(movieSearch: MovieSearch) {
    this.movieSearch = this.customMethod.getCopy(movieSearch);
    this.movieSearchChanged.emit(this.movieSearch);
  }
  updatePersonSearch(personSearch: PersonSearch) {
    this.personSearch = this.customMethod.getCopy(personSearch);
    this.personSearchChanged.emit(this.personSearch);
  }
  updateSort(sort: Sort) {
    this.sort = this.customMethod.getCopy(sort);
    this.sortChanged.emit(this.sort);
  }
}
