import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  constructor(
    private utilityService: UtilityService,
  ) {
    this.utilityService.title = "CUSTOMER CHECKIN";
  }

  ngOnInit(): void {
  }

}
