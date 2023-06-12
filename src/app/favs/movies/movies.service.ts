import { EventEmitter, Injectable } from '@angular/core';
import {
  Discover,
  MovieSearch,
  PersonSearch,
  Sort,
  COUNTRIES,
  GENRES,
  RELEASE_TYPES,
} from './movie.model';
import { CustomMethodService } from 'src/app/shared/custom-method.service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  baseUrl = 'https://api.themoviedb.org/3';
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjY4NTc3ZjI5MWM3NTkzY2M0YjE1ZmMxNDhkZTZkNCIsInN1YiI6IjY0ODM1MGFjZTM3NWMwMDExYzdmM2VlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ThE_Z-h9XD9hq3X3KRP9epFqrSnigE7UtUq2fQ-yo-o',
    },
  };
  current_sort: Sort = new Sort('popularity', 'desc', 1);
  current_discover: Discover = new Discover(this.current_sort, []);
  current_movieSearch: MovieSearch = new MovieSearch('', []);
  current_personSearch: PersonSearch = new PersonSearch('', 'en-US', 1);

  // info: Event Emitters
  sortChanged = new EventEmitter<Sort>();
  discoverChanged = new EventEmitter<Discover>();
  movieSearchChanged = new EventEmitter<MovieSearch>();
  personSearchChanged = new EventEmitter<PersonSearch>();

  constructor(private customMethod: CustomMethodService) {}

  getDiscover() {
    fetch(
      `${this.baseUrl}/discover/movie?${this.current_discover.toString()}`,
      this.options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }

  countries() {
    let abbreviations!: [];
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjY4NTc3ZjI5MWM3NTkzY2M0YjE1ZmMxNDhkZTZkNCIsInN1YiI6IjY0ODM1MGFjZTM3NWMwMDExYzdmM2VlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ThE_Z-h9XD9hq3X3KRP9epFqrSnigE7UtUq2fQ-yo-o',
      },
    };

    fetch(
      'https://api.themoviedb.org/3/configuration/countries?language=en-US',
      options
    )
      .then((response) => response.json())
      .then((response) => {
        abbreviations = response.map(
          (country: {
            iso_3166_1: string;
            english_name: string;
            native_name: string;
          }) => country.iso_3166_1
        );
        console.log(abbreviations);
        return abbreviations;
      })
      .catch((err) => console.error(err));
    return abbreviations;
  }

  // info: Methods that return initial values for the current_ properties
  initialDiscover() {
    this.current_discover.reset();
    return this.customMethod.getCopy(this.current_discover);
  }
  initialMovieSearch() {
    this.current_movieSearch.reset();
    return this.customMethod.getCopy(this.current_movieSearch);
  }
  initialPersonSearch() {
    this.current_personSearch.reset();
    return this.customMethod.getCopy(this.current_personSearch);
  }
  initialSort() {
    this.current_sort.reset();
    return this.customMethod.getCopy(this.current_sort);
  }

  // info: Methods that update the current_ properties with new values
  updateDiscover(discover: Discover) {
    this.current_discover = this.customMethod.getCopy(discover);
    this.discoverChanged.emit(this.current_discover);
  }
  updateMovieSearch(movieSearch: MovieSearch) {
    this.current_movieSearch = this.customMethod.getCopy(movieSearch);
    this.movieSearchChanged.emit(this.current_movieSearch);
  }
  updatePersonSearch(personSearch: PersonSearch) {
    this.current_personSearch = this.customMethod.getCopy(personSearch);
    this.personSearchChanged.emit(this.current_personSearch);
  }
  updateSort(sort: Sort) {
    this.current_sort = this.customMethod.getCopy(sort);
    this.sortChanged.emit(this.current_sort);
  }
}
