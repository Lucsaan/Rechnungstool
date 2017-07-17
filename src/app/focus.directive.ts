import { Directive, Input, EventEmitter, Inject, ElementRef, Renderer, OnChanges } from '@angular/core';

@Directive({
  selector: '[focusDirective]'
})
export class FocusDirective implements OnChanges {
   
  

  constructor(@Inject(ElementRef) private element: ElementRef, private renderer: Renderer) { }

  ngOnInit(){
    
  }

  ngOnChanges(){
    console.log('Jetzt hat sich was verändert');
    this.element.nativeElement.focus();
    
  }
  ngAfterViewInit(){
    console.log('Jetzt hat sich was verändert');
    this.element.nativeElement.focus();
  }

}
