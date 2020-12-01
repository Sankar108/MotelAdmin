import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { RoomInfoComponent } from './room-info/room-info.component';
import { CheckinComponent } from './customer/checkin/checkin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { RoomsComponent } from './rooms/rooms.component';

@NgModule({
  declarations: [DashboardComponent, RoomInfoComponent, CheckinComponent, RoomsComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})

export class LayoutModule { }
