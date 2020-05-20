import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioComponent } from './component/audio/audio.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MyLoaderComponent } from './component/my-loader/my-loader.component';
import {LoaderService} from './service/loader/loader.service';
import {LoaderInterceptor} from './interceptor/loader-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AudioComponent,
    MyLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
