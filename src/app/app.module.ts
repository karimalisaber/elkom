import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from 'src/app/store/root.store'
import { EffectsModule } from '@ngrx/effects';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import * as fromLookups from './store/lookups'
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { HttpInterceptor } from './services/interceptors/http.interceptor';
import { SessionEffects } from './store/session/session.effects';
import { UserEffects } from './store/session';
export function HttpLoaderFactory(http: HttpClient) : TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzNotificationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IconsProviderModule,
    NzIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    StoreModule.forRoot(fromRoot.reducers),
    StoreModule.forFeature(fromLookups.featureKey, fromLookups.reducers, {}),
    NgxSpinnerModule,
    EffectsModule.forRoot(),
    EffectsModule.forFeature([
      ...fromLookups.effects,
      ...UserEffects,
      SessionEffects
    ])
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
