import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() name!: string;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() control!: FormControl;
  // get hasError(): () => boolean{
  //   return  this.control? (this.control.errors && (this.control.dirty || this.control.touched)):false;
  // }
  get hasError(): boolean {
    return this.control
      ? !!(this.control.errors && (this.control.dirty || this.control.touched))
      : false;
  }
}
