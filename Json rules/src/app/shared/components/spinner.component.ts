import { Component, Input, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-spinner',
    template: `<div [hidden]="!isDelayedRunning" class="spinner">
    <img src="./assets/img/busy.gif" alt="Loading" /></div>`
})
export class SpinnerComponent implements OnDestroy {

    @Input() public delay: number = 300;
    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    public isDelayedRunning: boolean = false;
    private currentTimeout: any;

    public ngOnDestroy(): any {
        this.cancelTimeout();
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }
}
