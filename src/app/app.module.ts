import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header.component';
import { CartListComponent } from './components/cart-list.component';
import { ProductItemComponent } from './components/product-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    CartListComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
