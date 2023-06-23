import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movies-results',
  templateUrl: './movies-results.component.html',
  styleUrls: ['./movies-results.component.css'],
})
export class MoviesResultsComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movies = this.movieService.movie_results;

    this.movieService.movieResultsChanged.subscribe((movie_results) => {
      this.movies = movie_results;
    });
  }
}
