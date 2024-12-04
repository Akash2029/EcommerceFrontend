import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { UserAuthService } from './user-auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient,
    private userService:UserService
  ) { }

  addProduct(product:FormData){
    return this.httpClient.post(this.userService.pathOfApi + "/product/add",product);
  }

  getProduct(){
    return this.httpClient.get(this.userService.pathOfApi + "/product/get");
  }

  deleteProduct(productId:number){
    return this.httpClient.delete(this.userService.pathOfApi + "/product/delete/"+productId,{responseType : 'text'});
  }

  getProductById(productId:any){
    return this.httpClient.get<Product>(this.userService.pathOfApi + "/product/getById/" + productId);
  }
}
