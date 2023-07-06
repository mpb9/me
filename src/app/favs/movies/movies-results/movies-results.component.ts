import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie.model';
import { MyMoviesService } from '../my-movies.service';
import { MovieList, MyMovieInfo, Rank, Watched } from '../my-movies.model';

@Component({
  selector: 'app-movies-results',
  templateUrl: './movies-results.component.html',
  styleUrls: ['./movies-results.component.css'],
})
export class MoviesResultsComponent implements OnInit {
  movies: Movie[] = [];
  showOptions!: boolean[];
  watched: Watched[] = [];
  watchlist: number[] = [];
  rankings: Rank[] = [];
  movieLists: MovieList[] = [];
  myMovieInfo: MyMovieInfo[] = [];

  constructor(
    private movieService: MoviesService,
    private myMovieService: MyMoviesService
  ) {}

  ngOnInit() {
    this.movies = this.movieService.movie_results;
    const length = this.movies.length;
    this.showOptions = new Array(length).fill(false);
    this.watched = this.myMovieService.watched;
    this.watchlist = this.myMovieService.watchlist;
    this.rankings = this.myMovieService.rankings;
    this.movieLists = this.myMovieService.movieLists;

    this.movieService.movieResultsChanged.subscribe((movie_results) => {
      this.movies = movie_results;
      const length = this.movies.length;
      this.showOptions = new Array(length).fill(false);
    });

    this.myMovieService.watchedChanged.subscribe((watched) => {
      this.watched = watched;
    });
    this.myMovieService.watchlistChanged.subscribe((watchlist) => {
      this.watchlist = watchlist;
    });
    this.myMovieService.rankingsChanged.subscribe((rankings) => {
      this.rankings = rankings;
    });
    this.myMovieService.movieListsChanged.subscribe((movieLists) => {
      this.movieLists = movieLists;
    });
    this.myMovieService.myMovieInfoChanged.subscribe((myMovieInfo) => {
      this.myMovieInfo = myMovieInfo;
    });
  }

  addToWatchlist(id: number) {
    this.myMovieService.addToWatchlist(id);
  }
  removeFromWatchlist(id: number) {
    this.myMovieService.removeFromWatchlist(id);
  }
}
