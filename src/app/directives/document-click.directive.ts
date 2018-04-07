import { Directive, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[documentClick]'
})
export class DocumentClickDirective {
  constructor(private _elementRef: ElementRef) { }
  @Output()
  public documentClick = new EventEmitter<MouseEvent>();

  @HostListener('document:click',['$event','$event.target'])
  public clickOutside(event: MouseEvent,targetElement: HTMLElement): void{
    if(!targetElement) return;
    var clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if(clickedInside){
      this.documentClick.emit(event);
    }
  }
}
