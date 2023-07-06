import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './headers/header/header.component';
import { HomeComponent } from './home/home.component';
import { LilHeaderComponent } from './headers/lil-header/lil-header.component';
import { CredentialsComponent } from './utility/credentials/credentials.component';
import { ToDoComponent } from './utility/to-do/to-do.component';
import { LinksComponent } from './utility/links/links.component';
import { MoviesComponent } from './favs/movies/movies.component';
import { FavsComponent } from './favs/favs.component';
import { FormsModule } from '@angular/forms';
import { MoviesResultsComponent } from './favs/movies/movies-results/movies-results.component';
import { WatchlistComponent } from './favs/movies/watchlist/watchlist.component';
import { MovieListsComponent } from './favs/movies/movie-lists/movie-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LilHeaderComponent,
    CredentialsComponent,
    ToDoComponent,
    LinksComponent,
    MoviesComponent,
    FavsComponent,
    MoviesResultsComponent,
    WatchlistComponent,
    MovieListsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
