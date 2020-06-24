import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
    animations: [
        trigger('longFade', [
            state('in', style({opacity: 1})),
            transition(':enter', [
                style({opacity: 0}),
                animate(1650)
            ])
        ])
    ]
})
export class WelcomeComponent {
    constructor() {
    }
}


