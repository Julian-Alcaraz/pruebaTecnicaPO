import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css','../input/input.component.css']
})
export class SelectComponent {
  @Input() name!: string;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() control!: FormControl;
  @Input() options!: String[];

  get hasError(): boolean {
    return this.control ? !!(this.control.errors && (this.control.dirty || this.control.touched)) : false;
  }
}
