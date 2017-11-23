import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDzjXA_Husm5-7vCjWuyBvTUuS8X7NASpc',
    authDomain: 'bitfinex-portfolio.firebaseapp.com',
    databaseURL: 'https://bitfinex-portfolio.firebaseio.com',
    projectId: 'bitfinex-portfolio',
    storageBucket: 'bitfinex-portfolio.appspot.com',
    messagingSenderId: '739060831691'
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
