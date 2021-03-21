import { Component, OnInit } from '@angular/core';
import { RoomDetails } from 'src/app/models/room';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {

  public roomDetails: any =
    {
      "Id": 1,
      "RoomNo": "#B101",
      "RoomTypeId": 1,
      "RoomType": "VIP",
      "RoomSize": 40,
      "Beds": 4,
      "Facilities": [
        { "Id": 1, "Value": "AC" },
        { "Id": 2, "Value": "TV" }
      ],
      "Images": [
        { "Id": 1, "Url": "http://websitePath/Images/ImageOne.jpg" },
        { "Id": 2, "Url": "http://websitePath/Images/ImageOne.jpg" },
        { "Id": 3, "Url": "http://websitePath/Images/ImageOne.jpg" }
      ],
      "Description": "Test Description"
    };

  constructor(
    private utilityService: UtilityService,
  ) {
    this.utilityService.title = "ROOM INFORMATION";
  }

  ngOnInit(): void {
  }

}
