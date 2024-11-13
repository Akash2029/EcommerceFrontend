import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from './models/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective {

  @Output() files: EventEmitter<FileHandle> = new EventEmitter();
  @HostBinding("style.background") private background = "#eee"
  constructor(private sanitizaer:DomSanitizer) { }

  @HostListener("dragover",["$event"])
  onDragOver(evt:DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave",["$event"])
  onDragLeave(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop",["$event"])
  onDrop(evt: DragEvent){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";

    let FileHandle : FileHandle;
    if(evt.dataTransfer?.files[0]){
      const file = evt.dataTransfer?.files[0];
      const url = this.sanitizaer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      FileHandle = {file,url};
      this.files.emit(FileHandle);
    }   
  }
}
