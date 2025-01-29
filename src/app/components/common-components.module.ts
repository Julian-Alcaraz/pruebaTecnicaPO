import { NgModule } from '@angular/core';
import { PageTitleComponent } from './page-title/page-title.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [PageTitleComponent, InputErrorComponent, InputComponent, SelectComponent, NotificationComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [],
  exports: [PageTitleComponent, InputErrorComponent, InputComponent, SelectComponent, NotificationComponent],
})
export class CommonComponentsModule {}
