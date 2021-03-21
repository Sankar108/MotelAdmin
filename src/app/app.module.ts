import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { LoaderService } from './services/loader.service';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ngfModule, ngf } from "angular-file"
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"

@NgModule({
  declarations: [
    AppComponent, PageLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ngfModule,
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    PopoverModule.forRoot(),
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);