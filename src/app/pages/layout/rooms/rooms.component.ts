import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OccupiedRoomDetailModel, OccupiedRoomModel, occuupiedCustomerInfo, RoomModel } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  sub: Subscription;
  roomStatus = "";
  pageTitle = "";
  rooms: RoomModel[] = [];
  occupiedCustomerList: occuupiedCustomerInfo[] = [];
  roomBtnText = 'Book Room';

  occupiedRoomList: OccupiedRoomModel[] = [];

  underCleanRooms: RoomModel[] = [];
  occupideRooms: RoomModel[] = [];
  vacantRooms: RoomModel[] = [];

  title = 'Welcome word';
  content = 'Vivamus sagittis lacus vel augue laoreet rutrum faucibus.';

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.sub = this.route.data.subscribe(v => {
      if (v && v.roomStatus) {
        this.roomStatus = v.roomStatus;
        this.SetroomStatus();
      }
      else {
        this.roomStatus = "vacant";
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  SetroomStatus() {
    if (this.roomStatus === 'underclining') {
      this.roomBtnText = "Set as cleaned";
      this.pageTitle = "UNDERCLEAN ROOMS";
      this.GetAllUnderCleaningRoom();
    }
    else if (this.roomStatus === 'occupied') {
      this.roomBtnText = 'Check out';
      this.pageTitle = "OCCUPIED ROOMS";
      this.GetOccupiedRoomList();
    }
    else {
      this.roomBtnText = 'Book room';
      this.pageTitle = "VACANT ROOMS";
      this.GetAllVacantRoom();
    }
  }

  SubmitRoom(roomID: any, customerId = 0) {
    if (this.roomStatus === 'occupied') {
      this.router.navigate(['/room/checkout', roomID,customerId]);
    }
    else if (this.roomStatus === 'vacant') {
      this.router.navigate(['/customer/', roomID]);
    }
    else {
      this.CleandRoom(roomID);
    }
  }

  GetOccupiedRoomList() {
    this.roomService.GetAllOccupiedRoom().subscribe((response: any) => {
      if (response.Succeeded) {
        this.rooms = [];
        this.occupiedCustomerList = [];
        this.occupiedRoomList = response.Data;
        this.occupiedRoomList.forEach(occupiedRoom => {
          this.rooms.push(occupiedRoom.RoomDetails);
          occupiedRoom.CustomerInfo.CheckinTime = occupiedRoom.CheckinTime;
          this.occupiedCustomerList.push(occupiedRoom.CustomerInfo);
        });
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }

  GetAllVacantRoom() {
    this.roomService.GetAllVacantRoom().subscribe((response: any) => {
      if (response.Succeeded) {
        this.rooms = response.Data;
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }

  GetAllUnderCleaningRoom() {
    this.roomService.GetAllUnderCleaningRoom().subscribe((response: any) => {
      if (response.Succeeded) {
        this.rooms = response.Data;
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }

  CleandRoom(roomID: any) {
    this.roomService.SetCleanedRoom(roomID).subscribe((response: any) => {
      if (response.Succeeded) {
        console.log(response.Data);
        this.utilityService.ShowMsg('room is cleaned', this.utilityService.success);
        this.GetAllUnderCleaningRoom();
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }
}
