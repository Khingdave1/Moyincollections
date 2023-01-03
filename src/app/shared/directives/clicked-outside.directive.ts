import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickedOutside]'
})
export class ClickedOutsideDirective {

  @Output() public clickedOutside = new EventEmitter
  
  constructor(private el: ElementRef) {}

  @HostListener('document: click', ['$event.target'])

  public onClick(target: any) {
    const clickInside = this.el.nativeElement.contains(target)

    if(!clickInside) {
      this.clickedOutside.emit(target)
    }
  }
}
