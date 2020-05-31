import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AudioComponent} from './component/audio/audio.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';

@NgModule({
    declarations: [
        AppComponent,
        AudioComponent,
        NavBarComponent,
        SideNavComponent
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
