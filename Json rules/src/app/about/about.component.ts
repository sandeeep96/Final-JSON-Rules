import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flyInOutTrigger, hostConfig } from '../shared/animations/flyInOut.animation';

@Component({
  selector: 'about',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  styles: [`
  `],
  template: `
    <h1>About</h1>`
})
export class AboutComponent implements OnInit {

  constructor(
    public route: ActivatedRoute
  ) { }

  public ngOnInit() {
    console.log('hello `About` component');
  }

}
