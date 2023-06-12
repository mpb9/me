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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LilHeaderComponent,
    CredentialsComponent,
    ToDoComponent,
    LinksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
