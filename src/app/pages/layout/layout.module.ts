import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { CheckinComponent } from './customer/checkin/checkin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomsComponent } from './rooms/rooms.component';
import { RegisterComponent } from './customer/register/register.component';
import { RoomInfoComponent } from './rooms/room-info/room-info.component';
import { CheckoutComponent } from './rooms/checkout/checkout.component';
import { SearchUserComponent } from './customer/search-user/search-user.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    RoomInfoComponent,
    CheckinComponent,
    RoomsComponent,
    RegisterComponent,
    CheckoutComponent,
    SearchUserComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
  ]
})

export class LayoutModule { }
