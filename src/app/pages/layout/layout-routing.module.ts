import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckinComponent } from './customer/checkin/checkin.component';
import { RoomInfoComponent } from './room-info/room-info.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
  },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'customerCheckin',
    component: CheckinComponent,
  },
  {
    path: 'roomInfo',
    component: RoomInfoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
