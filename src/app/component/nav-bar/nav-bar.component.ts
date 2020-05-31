import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

    onToggleSidenav() {
        this.toggleSidenav.emit();
    }
}
