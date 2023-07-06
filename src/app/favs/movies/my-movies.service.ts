import { EventEmitter, Injectable } from '@angular/core';
import { CustomMethodService } from 'src/app/shared/custom-method.service';
import { MovieList, MyMovieInfo, Rank, Watched } from './my-movies.model';
import axios from 'axios';
import { Movie } from './movie.model';

@Injectable({
  providedIn: 'root',
})
export class MyMoviesService {
  movies: Movie[] = [];
  rankings: Rank[] = [];
  movieLists: MovieList[] = [];
  watched: Watched[] = [];
  watchlist: number[] = [];
  myMovieInfo: MyMovieInfo[] = [];

  // info: Event Emitters
  rankingsChanged = new EventEmitter<Rank[]>();
  movieListsChanged = new EventEmitter<MovieList[]>();
  watchedChanged = new EventEmitter<Watched[]>();
  watchlistChanged = new EventEmitter<number[]>();
  myMovieInfoChanged = new EventEmitter<MyMovieInfo[]>();

  constructor(private customMethod: CustomMethodService) {}

  // info: Initialize all of My Data
  async initMyData() {
    await this.loadRankings();
    // await this.loadMovieLists();
    await this.loadWatched();
    await this.loadWatchlist();
    console.log(this.rankings);
    // console.log(this.movieLists);
    console.log(this.watched);
    console.log(this.watchlist);
  }

  // info: Get all My Data for Current Movie[]
  async pushCurrentMovie(movie: Movie) {
    this.movies.push(movie);
    await this.getMyInfo(movie.id);
  }
  async getMyInfo(id: number) {
    const possibleRank = this.rankings.find((rank) => rank.id === id);
    const rank = possibleRank === undefined ? new Rank(id, 0, 0) : possibleRank;
    const possibleWatched = this.watched.find((watched) => watched.id === id);
    const watched = possibleWatched === undefined ? false : true;
    const rating = watched ? possibleWatched!.rating : 0;
    const possibleWatchlist = this.watchlist.find(
      (watchlist) => watchlist === id
    );
    const watchlist = possibleWatchlist === undefined ? false : true;
    this.myMovieInfo.push(
      new MyMovieInfo(id, rank, watched, rating, watchlist)
    );
    this.myMovieInfoChanged.emit(this.myMovieInfo);
  }
  async clearCurrentMovies() {
    this.movies = [];
    this.myMovieInfo = [];
    this.myMovieInfoChanged.emit(this.myMovieInfo);
  }

  // info: Get API Data
  async loadRankings() {
    this.rankings = [];
    await axios
      .request({
        method: 'GET',
        url: 'http://localhost/me-apis/movies/rankings/get.php',
        headers: { 'content-type': 'application/json' },
      })
      .then((result) => {
        this.pushRankings(result.data);
      })
      .catch((error) => console.log(error));
  }
  /* async loadMovieLists() {
    this.movieLists = [];
    await axios
      .request({
        method: 'GET',
        url: 'http://localhost/me-apis/movies/movie_lists/get.php',
        headers: { 'content-type': 'application/json' },
      })
      .then((result) => {
        this.pushMovieLists(result.data);
      })
      .catch((error) => console.log(error));
  } */
  async loadWatched() {
    this.watched = [];
    await axios
      .request({
        method: 'GET',
        url: 'http://localhost/me-apis/movies/watched/get.php',
        headers: { 'content-type': 'application/json' },
      })
      .then((result) => {
        this.pushWatched(result.data);
      })
      .catch((error) => console.log(error));
  }
  async loadWatchlist() {
    this.watchlist = [];
    await axios
      .request({
        method: 'GET',
        url: 'http://localhost/me-apis/movies/watchlist/get.php',
        headers: { 'content-type': 'application/json' },
      })
      .then((result) => {
        this.pushWatchlist(result.data);
      })
      .catch((error) => console.log(error));
  }

  // info: Push API Data to Arrays
  pushRankings(rankings: { id: number; rank: number; tier: number }[]) {
    rankings.forEach((ranking) => {
      this.rankings.push(
        new Rank(Number(ranking.id), Number(ranking.rank), Number(ranking.tier))
      );
    });
  }
  /* pushMovieLists(
    movie_lists: {
      id: number;
      name: string;
      description: string;
      movies: number[];
    }[]
  ) {
    movie_lists.forEach((movie_list) => {
      this.movieLists.push(
        new MovieList(
          movie_list.id,
          movie_list.name,
          movie_list.description,
          movie_list.movies
        )
      );
    });
  } */
  pushWatched(watched: { id: number; rating: number }[]) {
    watched.forEach((watched) => {
      this.watched.push(
        new Watched(Number(watched.id), Number(watched.rating))
      );
    });
  }
  pushWatchlist(watchlist: { id: number }[]) {
    watchlist.forEach((watchlist) => {
      this.watchlist.push(Number(watchlist.id));
    });
  }

  // info: Add Data
  async addToRanking(id: number, rank: number, tier: number) {
    await axios
      .request({
        method: 'POST',
        url: 'http://localhost/me-apis/movies/rankings/add.php',
        headers: { 'content-type': 'application/json' },
        data: { id, rank, tier },
      })
      .then((result) => {
        this.pushRankings(result.data);
      })
      .catch((error) => console.log(error));
    this.myMovieInfo.map((movie) => {
      if (movie.id === id) {
        movie.rank = new Rank(id, rank, tier);
      }
    });
    this.myMovieInfoChanged.emit(this.myMovieInfo);
  }
  /* async addToMovieList(name: string, description: string, movies: number[]) {
    await axios
      .request({
        method: 'POST',
        url: 'http://localhost/me-apis/movies/movie_lists/add.php',
        headers: { 'content-type': 'application/json' },
        data: { name, description, movies },
      })
      .then((result) => {
        this.pushMovieLists(result.data);
      }
      .catch((error) => console.log(error));
  } */
  async addToWatched(id: number, rating: number) {
    await axios
      .request({
        method: 'POST',
        url: 'http://localhost/me-apis/movies/watched/add.php',
        headers: { 'content-type': 'application/json' },
        data: { id, rating },
      })
      .then((result) => {
        this.pushWatched(result.data);
      })
      .catch((error) => console.log(error));

    this.myMovieInfo.map(async (movie) => {
      if (movie.id === id) {
        movie.watched = true;
        movie.rating = rating;
        if (movie.watchlist) {
          await this.removeFromWatchlist(id);
        }
      }
    });
    this.myMovieInfoChanged.emit(this.myMovieInfo);
  }
  async addToWatchlist(id: number) {
    await axios
      .request({
        method: 'POST',
        url: 'http://localhost/me-apis/movies/watchlist/add.php',
        headers: { 'content-type': 'application/json' },
        data: { id },
      })
      .then((result) => {
        this.pushWatchlist(result.data);
      })
      .catch((error) => console.log(error));
    this.myMovieInfo.map((movie) => {
      if (movie.id === id) {
        movie.watchlist = true;
      }
    });
    this.myMovieInfoChanged.emit(this.myMovieInfo);
  }

  // info: Remove Data
  async removeFromRanking(id: number) {
    await axios
      .request({
        method: 'POST',
        url: 'http://localhost/me-apis/movies/rankings/remove.php',
        headers: { 'content-type': 'application/json' },
        data: { id },
      })
      .then((result) => {
        this.pushRankings(result.data);
      })
      .catch((error) => console.log(error));
    this.myMovieInfo.map((movie) => {
      if (movie.id === id) {
        movie.rank = new Rank(id, 0, 0);
      }
    });
    this.myMovieInfoChanged.emit(this.myMovieInfo);
  }
  /* async removeFromMovieList(id: number) {
    await axios
      .request({
        method: 'POST',
        url: 'http://localhost/me-apis/movies/movie_lists/remove.php',
        headers: { 'content-type': 'application/json' },
        data: { id },
      })
      .then((result) => {
        this.pushMovieLists(result.data);
      })
      .catch((error) => console.log(error));
  } */
  async removeFromWatched(id: number) {
    await axios
      .request({
        method: 'POST',
        url: 'http://localhost/me-apis/movies/watched/remove.php',
        headers: { 'content-type': 'application/json' },
        data: { id },
      })
      .then((result) => {
        this.pushWatched(result.data);
      })
      .catch((error) => console.log(error));
    this.myMovieInfo.map((movie) => {
      if (movie.id === id) {
        movie.watched = false;
        movie.rating = 0;
      }
    });
    this.myMovieInfoChanged.emit(this.myMovieInfo);
  }
  async removeFromWatchlist(id: number) {
    await axios
      .request({
        method: 'POST',
        url: 'http://localhost/me-apis/movies/watchlist/remove.php',
        headers: { 'content-type': 'application/json' },
        data: { id },
      })
      .then((result) => {
        this.pushWatchlist(result.data);
      })
      .catch((error) => console.log(error));
    this.myMovieInfo.map((movie) => {
      if (movie.id === id) {
        movie.watchlist = false;
      }
    });
    this.myMovieInfoChanged.emit(this.myMovieInfo);
  }
}
