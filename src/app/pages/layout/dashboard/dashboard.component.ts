import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RoomCountModel } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(
    public utilityService: UtilityService,
    private roomService: RoomService,
  ) {
    this.utilityService.title = "Dashboard";
  }

  roomCountList: RoomCountModel = new RoomCountModel();

  ngOnInit(): void {
    this.GetAllRoomCount();
  }

  GetAllRoomCount() {
    this.utilityService.showLoader();
    this.roomService.GetAllRoomCount().subscribe((response: any) => {
      this.utilityService.hideLoader();
      if (response.Succeeded)
        this.roomCountList = response.Data;
    },
      (err: HttpErrorResponse) => {
        this.utilityService.hideLoader();
        this.utilityService.ShowMsg(err.message, this.utilityService.error);
      })
  }
}

