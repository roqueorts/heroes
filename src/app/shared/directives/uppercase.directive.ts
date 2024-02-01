import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[ngModel] [appUppercase]',
  standalone: true
})
export class UppercaseDirective {


  @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor() {

  }
  @HostListener('keyup', ['$event']) onInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.ngModelChange.emit(input.value);
  }


}
