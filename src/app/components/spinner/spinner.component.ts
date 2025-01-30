import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: ` <div class="spinner" [style.width.px]="width" [style.height.px]="width"></div> `,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent {
  @Input() width: number = 60;
}
