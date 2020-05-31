import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
    animations: [
        trigger('longFade', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({opacity: 1})),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({opacity: 0}),
                animate(1200)
            ])
        ])
    ]
})
export class WelcomeComponent implements OnInit {
    trigAnimation = false;

    constructor() {
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.trigAnimation = true;
        }, 1000)
    }

}
