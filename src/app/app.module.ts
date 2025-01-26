import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ROOT_REDUCER } from './store/state/app.state';
import { CommonComponentsModule } from './components/common-components.module';
import { ErrorComponent } from './pages/error/error.component';
import { UserModule } from './pages/users/user.module';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    //
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCER),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    CommonComponentsModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
