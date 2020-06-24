import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef,} from '@angular/material/dialog';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<ImageComponent>,
      @Inject(MAT_DIALOG_DATA) public src: string) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
}
