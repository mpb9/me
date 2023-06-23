import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import {
  Discover,
  MovieSearch,
  PersonSearch,
  Sort,
  SORT_OPTIONS,
} from './movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['../fav.css'],
})
export class MoviesComponent implements OnInit {
  searched = false;
  searching = false;
  window = 'search';
  sort_options = SORT_OPTIONS;
  sort!: Sort;
  sort_display = 'popular';
  order_display = 'high ⇧';
  curr_discover!: Discover;
  curr_movieSearch!: MovieSearch;
  currrent_personSearch!: PersonSearch;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getBasicResults();

    this.curr_discover = this.movieService.initialDiscover();
    this.movieService.discoverChanged.subscribe((discover: Discover) => {
      this.curr_discover = discover;
    });

    this.curr_movieSearch = this.movieService.initialMovieSearch();
    this.movieService.movieSearchChanged.subscribe(
      (movieSearch: MovieSearch) => {
        this.curr_movieSearch = movieSearch;
      }
    );

    this.currrent_personSearch = this.movieService.initialPersonSearch();
    this.movieService.personSearchChanged.subscribe(
      (personSearch: PersonSearch) => {
        this.currrent_personSearch = personSearch;
      }
    );

    this.sort = this.movieService.initialSort();
    this.movieService.sortChanged.subscribe((sort: Sort) => {
      this.sort = sort;
    });
  }

  changeWindow(event: any) {
    this.window = event.target.value;
  }

  removeParam(param: any[]) {
    if (this.curr_discover.params.includes(param)) {
      this.curr_discover.params.splice(
        this.curr_discover.params.indexOf(param),
        1
      );
    }
    this.movieService.discoverChanged.emit(this.curr_discover);
    console.log(this.curr_discover);
  }

  async submitQuery() {
    this.searching = true;
    if (this.window === 'discover') {
      await this.movieService.getDiscover(this.curr_discover);
    } else if (this.window === 'search') {
      await this.movieService.getMovieSearch(this.curr_movieSearch);
    }
    this.searching = false;
    this.searched = true;
  }
}
