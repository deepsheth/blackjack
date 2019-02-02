import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {NgxLocalStorageModule} from 'ngx-localstorage';

import { AppComponent } from './app.component';
import { GametableComponent } from './components/gametable/gametable.component';
import { CardComponent } from './components/card/card.component';
import { HandComponent } from './components/hand/hand.component';

import { ButtonsModule } from 'ngx-bootstrap/buttons';

@NgModule({
  declarations: [
    AppComponent,
    GametableComponent,
    CardComponent,
    HandComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxLocalStorageModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
