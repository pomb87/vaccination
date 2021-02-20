import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VaccPerAreaComponent } from './vacc-per-area/vacc-per-area.component';
import { CollapseNavbarComponent } from './collapse-navbar/collapse-navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { VaccPerAgeComponent } from './vacc-per-age/vacc-per-age.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    VaccPerAreaComponent,
    CollapseNavbarComponent,
    VaccPerAgeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
