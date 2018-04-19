import { trigger, state, style, transition, animate, AnimationEntryMetadata } from '@angular/core';

export const flyInOutTrigger = trigger('flyInOut', [
    state('*', style({})),
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(300)
    ]),
    transition(':leave', animate(300, style({ transform: 'translateX(100%)' })))
]);

export const hostConfig: { [key: string]: string } = {
    '[@flyInOut]': 'true',
    '[style.display]': "'block'"
};
