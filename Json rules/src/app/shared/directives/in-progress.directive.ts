import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { AppSettings } from '../../app.settings';
@Directive({ selector: '[wip]' })

export class WorkInProgressDirective {
    constructor(private el: ElementRef, private renderer: Renderer) {
        if (!AppSettings.isDebugMode) {
            renderer.setElementStyle(el.nativeElement, 'pointer-events', 'none');
            renderer.setElementStyle(el.nativeElement, 'opacity', '0.3');
            renderer.setElementStyle(el.nativeElement, 'background-color', 'gray');
        }
    }
}
