import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollectionsEffects } from './store';
import { reducer as collectionsReducer } from '@app/store/collections/collections.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from '@environments/environment';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarComponent,

    // Store
    // toDo Is there a way to load the store just for the module or component in use?
    //Done
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('collections', collectionsReducer),
    EffectsModule.forRoot([CollectionsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
