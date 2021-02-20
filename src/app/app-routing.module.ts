import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { VaccPerAgeComponent } from './vacc-per-age/vacc-per-age.component';
import { VaccPerAreaComponent } from './vacc-per-area/vacc-per-area.component';

const routes: Routes = [
  { path: 'vaccPerArea', component: VaccPerAreaComponent },
  { path: 'vaccPerAge', component: VaccPerAgeComponent },
  { path: 'logs', component: MessagesComponent },
  { path: '', component: VaccPerAreaComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }