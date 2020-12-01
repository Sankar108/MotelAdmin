import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckinComponent } from './customer/checkin/checkin.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RegisterComponent } from './customer/register/register.component';
import { RoomInfoComponent } from './rooms/room-info/room-info.component';
import { CheckoutComponent } from './rooms/checkout/checkout.component';
import { SearchUserComponent } from './customer/search-user/search-user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
  },
  { path: 'dashboard', component: DashboardComponent },
  
  {
    path: 'rooms/occupied',
    component: RoomsComponent,
    data : {roomStatus : 'occupied'}
  },
  {
    path: 'rooms/underclining',
    component: RoomsComponent,
    data : {roomStatus : 'underclining'}
  },
  {
    path: 'rooms/vacant',
    component: RoomsComponent,
    data : {roomStatus : 'vacant'}
  },
  {
    path: 'roomInfo/:roomId',
    component: RoomInfoComponent,
  },
  {
    path: 'customer/:roomid',
    component: SearchUserComponent,
  },
  {
    path: 'room/checkin/:roomId',
    component: CheckinComponent,
  },
  {
    path: 'room/checkout/:roomId',
    component: CheckoutComponent,
  },
  
  {
    path: 'customer/register/:roomId',
    component: RegisterComponent,
  },
  {
    path: 'customer/checkin/:roomId',
    component: CheckinComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
