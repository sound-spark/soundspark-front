import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {ContactComponent} from './components/contact/contact.component';
import {AudioComponent} from './components/audio/audio.component';


const routes: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'projects', component: ProjectsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'asr', component: AudioComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
