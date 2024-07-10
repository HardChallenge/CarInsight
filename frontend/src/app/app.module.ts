import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }  from '@angular/common/http';
import { BackendFormComponent } from './backend-form/backend-form.component';
import { CarInfoComponent } from './car-info/car-info.component'; 
import { CarInfoService, NewsService } from './api.service';
import { NewsComponent } from './news/news.component';


@NgModule({
  declarations: [
    AppComponent,
    BackendFormComponent,
    CarInfoComponent,
    NewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [CarInfoService, NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
