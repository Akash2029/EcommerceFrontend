import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Product } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-product-view-details',
  standalone: true,
  imports: [MatButtonModule,MatGridListModule,CommonModule],
  templateUrl: './product-view-details.component.html',
  styleUrl: './product-view-details.component.scss'
})
export class ProductViewDetailsComponent implements OnInit {
  product:Product={
    productId:0,
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages: []
  }

  selectedProductIndex = 0;

  private readonly platformId = inject(PLATFORM_ID);

  activatedRoute = inject(ActivatedRoute)
  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      console.log(this.activatedRoute.snapshot.data);
      this.product = this.activatedRoute.snapshot.data['product'];   
      console.log(this.product);
    }
  }

  changeIndex(index:number){
    this.selectedProductIndex = index;
  }

  
}
