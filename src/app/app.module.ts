import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AudioComponent} from './components/audio/audio.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
    declarations: [
        AppComponent,
        AudioComponent,
        NavBarComponent,
        WelcomeComponent,
        AboutUsComponent,
        ProjectsComponent,
        ContactComponent,
        ImageComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
