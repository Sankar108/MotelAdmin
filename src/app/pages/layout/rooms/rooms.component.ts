import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OccupiedRoomDetailModel, RoomModel } from 'src/app/models/room';
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
  roomBtnText = 'Book Room';

  occupiedRoomList: OccupiedRoomDetailModel[] = [];

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

    this.GetRooms();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  GetRooms() {
    this.utilityService.showLoader();
    this.roomService.GetRooms().subscribe((response: any) => {
      this.utilityService.hideLoader();
      if (response.Succeeded) {
        this.rooms = response.Data;
        if (this.roomStatus === 'occupied') {
          this.rooms = this.rooms.filter(r => r.IsOccupied === true && r.IsCleaned);
          this.GetOccupiedRoomList();
        }
        else if (this.roomStatus === 'vacant') {
          this.rooms = this.rooms.filter(r => r.IsOccupied === false && r.IsCleaned);
        }
        else if (this.roomStatus === 'underclining') {
          this.rooms = this.rooms.filter(r => !r.IsOccupied === false && !r.IsCleaned);
        }
        console.log('rooms ', this.rooms);
      }
    },
      (err: HttpErrorResponse) => {
        this.utilityService.hideLoader();
        this.utilityService.ShowMsg(err.message, this.utilityService.error);
      })
  }

  SetroomStatus() {
    if (this.roomStatus === 'underclining') {
      this.roomBtnText = "cleaning";
      this.pageTitle = "UNDERCLEAN ROOMS"
    }
    else if (this.roomStatus === 'occupied') {
      this.roomBtnText = 'Check out';
      this.pageTitle = "OCCUPIED ROOMS"
    }
    else {
      this.roomBtnText = 'Book room';
      this.pageTitle = "VACANT ROOMS"
    }
  }

  SubmitRoom(roomID: any) {
    if (this.roomStatus === 'occupied') {
      this.router.navigate(['/room/checkout', roomID]);
    }
    else if (this.roomStatus === 'vacant') {
      this.router.navigate(['/customer/', roomID]);
    }
    else {
      this.CleandRoom(roomID);
    }
  }

  GetOccupiedRoomList() {
    this.roomService.GetOccupiedRoomList().subscribe((response: any) => {
      if (response.Succeeded) {
        this.occupiedRoomList = response.Data;
        this.rooms.forEach(room => {
          room.occupiedRoomData = this.occupiedRoomList.filter(r => r.RoomId == room.Id)[0];
        });
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }

  CleandRoom(roomID: any) {
  }
}
