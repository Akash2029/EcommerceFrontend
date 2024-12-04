import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductService } from '../services/product.service';
import { ImageProcessingService } from '../services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule,CommonModule,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly platformId = inject(PLATFORM_ID);
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.getAllProducts();
    }
  }
  prodService = inject(ProductService);
  imageService = inject(ImageProcessingService);
  router = inject(Router)
  dataSource:any;

  getAllProducts(){
    this.prodService.getProduct().subscribe({
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

  showProductDetails(val:number){
    console.log("akash checking something",val)
     this.router.navigate(['/productDetails',{productId:val}]);
  }
}
