import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject } from '@angular/core';

@Directive({
  selector: '[appEmail]',
  standalone: true
})
export class EmailDirective {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    el: ElementRef) {
    // Can be changed to whatever we want here
    var span = this.document.createElement('span');
    span.innerHTML = '@';
    span.style.position = 'absolute';
    span.style.top = '36px';
    span.style.left = '14px';
    span.style.fontSize = '20px';
    span.style.color = '#CCD2E2';
    el.nativeElement.parentElement.appendChild(span);

    el.nativeElement.parentElement.style.position = 'relative';
    el.nativeElement.style.paddingLeft = '40px';
  }

}
