import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  template: '<h3 style="text-align:center; font-weight: 400; font-size:20px; margin:0px; color:white" [innerHTML]="data[0]"></h3>',
})
export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
