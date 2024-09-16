import { Directive, ElementRef, HostBinding, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

/* eslint-disable */
@Directive({
  selector: 'input[formControlName],[formControlName]',
  standalone: true
})
/* eslint-enable */
export class AutoErrorsDirective {

  constructor(@Self() private control: NgControl,private readonly elRef: ElementRef) { }

  // @HostListener('input', ['$event'])
  // onInput(event: Event): void {
    
  // }

  @HostBinding('class.ng-dirty')
  get isInvalid() {
    const control = this.control.control;
    return control?.invalid && control?.touched;
  }

}
