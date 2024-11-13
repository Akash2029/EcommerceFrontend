import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { FileHandle } from './models/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  createImages(product:any){
    console.log(product);
    const productImages:any = product.productImages;
    console.log(productImages.length);
    const productImagesToFileHandle: FileHandle[] = [];
    for(let i=0;i<productImages.length;i++){
      const imageFileData = productImages[i];
      const imageBlob = this.dataURIToBlob(imageFileData.picByte,imageFileData.type);
      const file = new File([imageBlob],imageFileData.name,{type: imageFileData.type});
      const finalFile : FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };
      productImagesToFileHandle.push(finalFile);
    }
    product.productImages = productImagesToFileHandle;
    return product;
  }

  dataURIToBlob(picBytes:any,imageType:any){
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);

    const int8Array = new Uint8Array(arrayBuffer);
    for(let i=0;i<byteString.length;i++){
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array],{type:imageType});
    return blob;
  }
}
