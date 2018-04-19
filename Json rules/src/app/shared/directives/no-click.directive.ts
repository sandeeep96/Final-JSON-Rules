import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { AppSettings } from '../../app.settings';
@Directive({ selector: '[no-click]' })

export class NoClickProgressDirective {
    constructor(private el: ElementRef, private renderer: Renderer) {
        if (!AppSettings.isDebugMode) {
            renderer.setElementStyle(el.nativeElement, 'pointer-events', 'none');
        }
    }
}
