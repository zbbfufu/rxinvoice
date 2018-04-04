import {Directive, ElementRef, OnInit} from '@angular/core';

declare const Prism: any;
declare const $: any;

@Directive({
    selector: '[prism]'
})
export class PrismSyntaxHighlighterDirective implements OnInit {

    constructor(private elementRef: ElementRef) { }

    ngOnInit(): void {
        $(() => {
            this.elementRef.nativeElement.innerHTML = Prism.highlight(this.elementRef.nativeElement.innerHTML, Prism.languages.html);
        });
    }
}
