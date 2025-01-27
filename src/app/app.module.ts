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
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/effects/users.effects';

@NgModule({
  declarations: [AppComponent, ErrorComponent],
  imports: [
    //
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(ROOT_REDUCER),
    StoreDevtoolsModule.instrument({ name: 'TEST' }),
    CommonComponentsModule,
    UserModule,
    EffectsModule.forRoot([UsersEffects])
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
