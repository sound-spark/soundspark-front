import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ImageComponent} from '../image/image.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

    showImg(src: string) {
      this.dialog.open(ImageComponent, {
        maxWidth: '98vw',
        data: src
      });
    }
}
