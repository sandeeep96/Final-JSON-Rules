import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'myTimeAgo'
})
export class TimeAgoPipe implements PipeTransform {
    public transform(value: Date, []): string {
        let result: string;
        let now = new Date().getTime();
        let inDate = new Date(value);
        console.log(inDate.getTime());
        let delta = (now - inDate.getTime()) / 1000;
        if (delta < 10) {
            result = 'now';
        } else if (delta < 60) {
            result = Math.floor(delta) + ' second';
        } else if (delta < 3600) {
            result = Math.floor(delta / 60) + ' minute';
        } else if (delta < 86400) {
            result = Math.floor(delta / 3600) + ' hour';
        } else {
            result = Math.floor(delta / 86400) + ' day';
        }
        if (result !== 'now') {
            result = result.split(' ', 1)[0] !== '1' ? result + 's ago' : result + ' ago';
        }
        return result;
    }
}
