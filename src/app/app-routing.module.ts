import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LinksComponent } from './utility/links/links.component';
import { CredentialsComponent } from './utility/credentials/credentials.component';
import { ToDoComponent } from './utility/to-do/to-do.component';
import { MoviesComponent } from './favs/movies/movies.component';
import { FavsComponent } from './favs/favs.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'links', component: LinksComponent },
  { path: 'credentials', component: CredentialsComponent },
  { path: 'to_do', component: ToDoComponent },
  { path: 'favs', component: FavsComponent },
  { path: 'favs/movies', component: MoviesComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
