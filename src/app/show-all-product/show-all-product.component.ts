import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../services/image-processing.service';
import { map } from 'rxjs';
import { Product } from '../models/product.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-show-all-product',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,MatIconModule,MatDialogModule],
  templateUrl: './show-all-product.component.html',
  styleUrl: './show-all-product.component.scss'
})
export class ShowAllProductComponent implements OnInit{
  ngOnInit(): void {
    this.getAllProducts();
  }
  constructor(private prodService:ProductService,
    private dialog:MatDialog,
    private imageService: ImageProcessingService,
    private router:Router
  ){}
  dataSource:any = [];
  displayedColumns: string[] = ['position', 'Name of Product','description', 'Actual price', 'Discounted Price','Actions'];
  
  getAllProducts(){
    this.prodService.getProduct()
        //pipe helps us to call few functions before subscribing
    .subscribe({
      next: (res) => {
        this.dataSource = res;
        for(let i=0;i<this.dataSource.length;i++){
          this.imageService.createImages(this.dataSource[i]);
        }
        console.log("getting ",res);
      },
    error: (err:HttpErrorResponse) => {
      console.log(err);
    }
    }
      );
  }

  deleteProductDetails(val:any){
    this.prodService.deleteProduct(val)
    .subscribe({
      next: (res) => {
        this.getAllProducts();
        console.log(res);      
      },
      error: (error:HttpErrorResponse) => {
        console.log(error);
      }
    })
  }

  showImages(val:any){
    console.log(val);
    this.openDialog(val);
  }

  openDialog(val:any) {
    this.dialog.open(ShowProductImagesDialogComponent, {
      height: "500px",
      width:"800px",
      data: {
        image: val.productImages,
      },
    });
  }

  editProductDetails(val:number){
    this.router.navigate(['/addNewProduct',{productId:val}]);
    //resolvers make sure that backend operation is done and then html component is loaded
  }
}

