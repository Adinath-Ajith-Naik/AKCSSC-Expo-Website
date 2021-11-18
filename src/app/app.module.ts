import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpAPIInterceptor } from './shared/interceptor/http.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCYKbliFye1mK07F53ok2OSJiMuxqBY3SY',
      authDomain: 'akcssc-liker.firebaseapp.com',
      projectId: 'akcssc-liker',
      storageBucket: 'akcssc-liker.appspot.com',
      messagingSenderId: '894248687891',
      appId: '1:894248687891:web:c045b4e6baefbffef562e6',
      measurementId: 'G-9PR5415370',
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAPIInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
