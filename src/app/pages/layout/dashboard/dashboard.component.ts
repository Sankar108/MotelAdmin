import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RoomModel } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allRooms: RoomModel[] = [];
  occupiedRooms: RoomModel[] = [];
  vacantRooms: RoomModel[] = [];
  undercleanRooms: RoomModel[] = [];

  constructor(
    public utilityService: UtilityService,
    private roomService: RoomService
  ) {
    this.utilityService.title = "Dashboard";
  }

  ngOnInit(): void {
    this.GetRooms();
  }

  GetRooms() {
    this.utilityService.showLoader();
    this.roomService.GetRooms().subscribe((response: any) => {
      this.utilityService.hideLoader();
      if (response.Succeeded) {
        this.allRooms = response.Data;
        this.occupiedRooms = this.allRooms.filter(r => r.IsOccupied === true && r.IsCleaned);
        this.vacantRooms = this.allRooms.filter(r => r.IsOccupied === false && r.IsCleaned);
        this.undercleanRooms = this.allRooms.filter(r => !r.IsOccupied === false && !r.IsCleaned);
      }
    },
      (err: HttpErrorResponse) => {
        this.utilityService.hideLoader();
        this.utilityService.ShowMsg(err.message, this.utilityService.error);
      })
  }
}
