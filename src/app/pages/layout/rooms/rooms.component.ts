import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoomModel } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

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

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => {
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
    this.roomService.GetRooms().subscribe((response: any) => {
      if (response.succeeded) {
        this.rooms = response.data;
        console.log('rooms ', this.rooms);
      }
    },
      (err: HttpErrorResponse) => {
        alert(err.message);
      })
  }

  SetroomStatus() {
    if (this.roomStatus === 'underclining') {
      this.roomBtnText = "cleaning";
      this.pageTitle = "Under clean rooms"
    }
    else if (this.roomStatus === 'occupied') {
      this.roomBtnText = 'Check out';
      this.pageTitle = "Checked in rooms"
    }
    else {
      this.roomBtnText = 'Book room';
      this.pageTitle = "Vacant rooms"
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

  CleandRoom(roomID: any) {

  }
}
