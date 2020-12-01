import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckinComponent } from './customer/checkin/checkin.component';
import { RoomInfoComponent } from './room-info/room-info.component';
import { RoomsComponent } from './rooms/rooms.component';



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
  },
  {
    path: 'occupied_rooms',
    component: RoomsComponent,
    data : {roomStatus : 'occupied'}
  },
  {
    path: 'underclining_rooms',
    component: RoomsComponent,
    data : {roomStatus : 'underclining'}
  },
  {
    path: 'vacant_rooms',
    component: RoomsComponent,
    data : {roomStatus : 'vacant'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
