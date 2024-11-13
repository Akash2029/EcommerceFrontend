import { Component, Inject, Injector, OnInit } from '@angular/core';
import {MatDialogModule,MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileHandle } from '../models/file-handle.model';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-show-product-images-dialog',
  standalone: true,
  imports: [MatDialogModule,MatGridListModule,CommonModule],
  templateUrl: './show-product-images-dialog.component.html',
  styleUrl: './show-product-images-dialog.component.scss'
})
export class ShowProductImagesDialogComponent implements OnInit{
    constructor(@Inject(MAT_DIALOG_DATA) public data: any){
      
    }
  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages(){
    console.log(this.data);
  }
}
