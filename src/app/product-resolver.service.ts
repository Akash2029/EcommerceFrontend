import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from './models/product.model';
import { ProductService } from './services/product.service';
import { map, Observable, of } from 'rxjs';
import { ImageProcessingService } from './services/image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product>{

  constructor(private prodService:ProductService,
    private imageService:ImageProcessingService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("productId");
    if(id){
     return this.prodService.getProductById(id).pipe(
      map(p => this.imageService.createImages(p))
     );
    }else{
      return of(this.getProductDetails());
    }
  }

  getProductDetails(){
    return {
      productId:0,
      productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages: []
    }
  }
}
