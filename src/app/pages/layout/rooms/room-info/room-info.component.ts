import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {

  roomList = [
    {
      roomID: "Room #01",
      status: "King"
    },
    {
      roomID: "Room #01",
      status: "King"
    },
    {
      roomID: "Room #01",
      status: "King"
    },
    {
      roomID: "Room #01",
      status: "King"
    },
    {
      roomID: "Room #01",
      status: "King"
    }
  ];
  constructor(
    private utilityService: UtilityService,
  ) {
    this.utilityService.title = "ROOM INFORMATION";
  }

  ngOnInit(): void {
  }

}
