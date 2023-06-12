import { Component, OnInit } from '@angular/core';
import { MoviesService } from './movies.service';
import { Discover, MovieSearch, PersonSearch, Sort } from './movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['../favs.component.css'],
})
export class MoviesComponent implements OnInit {
  queryType = 'discover';
  current_sort!: Sort;
  current_discover!: Discover;
  current_movieSearch!: MovieSearch;
  currrent_personSearch!: PersonSearch;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.current_discover = this.movieService.initialDiscover();
    this.movieService.discoverChanged.subscribe((discover: Discover) => {
      this.current_discover = discover;
    });

    this.current_movieSearch = this.movieService.initialMovieSearch();
    this.movieService.movieSearchChanged.subscribe(
      (movieSearch: MovieSearch) => {
        this.current_movieSearch = movieSearch;
      }
    );

    this.currrent_personSearch = this.movieService.initialPersonSearch();
    this.movieService.personSearchChanged.subscribe(
      (personSearch: PersonSearch) => {
        this.currrent_personSearch = personSearch;
      }
    );

    this.current_sort = this.movieService.initialSort();
    this.movieService.sortChanged.subscribe((sort: Sort) => {
      this.current_sort = sort;
    });
  }

  changeQueryType() {
    if (this.queryType === 'discover') {
      this.queryType = 'search';
    } else {
      this.queryType = 'discover';
    }
  }

  changeSortParam(event: any) {
    this.current_sort.param = event.target.value;
    console.log(this.current_sort);
  }

  changeSortOrder(event: any) {
    this.current_sort.order = event.target.value;
    console.log(this.current_sort);
  }

  addParam(event: any) {
    this.current_discover.params.push([event.target.value, '']);
    this.movieService.discoverChanged.emit(this.current_discover);
    console.log(this.current_discover);
  }

  removeParam(param: any[]) {
    if (this.current_discover.params.includes(param)) {
      this.current_discover.params.splice(
        this.current_discover.params.indexOf(param),
        1
      );
    }
    this.movieService.discoverChanged.emit(this.current_discover);
    console.log(this.current_discover);
  }

  countries() {
    console.log(this.movieService.countries());
  }
  discover() {
    const include_video = false;
    const sort_by = 'popularity';
    const order_by = 'desc';

    this.movieService.getDiscover();
  }
}
