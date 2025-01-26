import { NgModule } from '@angular/core';
import { PageTitleComponent } from './page-title/page-title.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PageTitleComponent, InputErrorComponent, InputComponent],
  imports: [CommonModule,ReactiveFormsModule, ],
  providers: [],
  exports:[PageTitleComponent,InputErrorComponent,InputComponent]
})
export class CommonComponentsModule {}
