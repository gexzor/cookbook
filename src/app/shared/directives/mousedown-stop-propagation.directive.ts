import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[mousedownStopPropagation]',
})
export class MousedownStopPropagationDirective {
  @HostListener('mousedown', ['$event'])
  public onMousedown(event: any): void {
    event.stopPropagation();
  }
}

// TODO: Not working - so fix it!
