import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../models/product.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { FileHandle } from '../models/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import {MatGridListModule} from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { DragDirective } from '../drag.directive';

@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,FormsModule,MatGridListModule,CommonModule ,DragDirective],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.scss'
})
export class AddNewProductComponent implements OnInit{
  ngOnInit(): void {
 
  }

  constructor(private productService:ProductService,
    private domSanitizer:DomSanitizer
  ){}

  product:Product={
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImage: []
  }

  // requestHeader = new HttpHeaders({"Content-Type":"multipart/form-data"});

  addProduct(product:NgForm){

    const productFormData = this.createFileUploadBody(this.product);
    this.productService.addProduct(productFormData)
    .subscribe((res) =>{
      console.log("api response",res);
      product.reset();
      this.product.productImage = [];
    },
  (error) =>{
    console.log(error);
  })
    console.log("checking product",product.value);
  }

  createFileUploadBody(product:Product):FormData{
    const formData = new FormData();
    formData.append("product",new Blob([JSON.stringify(product)],{type:'application/json'}))
    for(var i=0;i<product.productImage.length;i++){
      formData.append('imageFile',product.productImage[i].file,product.productImage[i].file.name);
    }
    formData.forEach(res => {
      console.log("akash checking formdata",res);
    });
    return formData;
  }

  onFileSelected(value:any){
    console.log(value.target.files);
    if(value.target.files){
      const file = value.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.domSanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)                          
        )
      }
      this.product.productImage.push(fileHandle);
      console.log("checking upload image",this.product.productImage);
    }
  }

  removeImage(index:number){
    this.product.productImage.splice(index,1);
  }

  fileDropped(fileHandle:any){
    this.product.productImage.push(fileHandle);
  }
}
