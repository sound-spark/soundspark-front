import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private titleService: Title) {
  }
  public setTitle() {
    this.titleService.setTitle('Sound Spark');
  }
  ngOnInit() {
    this.setTitle();
  }
}
