import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerModel, CustomerModel2 } from 'src/app/models/customer';
import { BookRoomModel, RoomModel } from 'src/app/models/room';
import { CustomerService } from 'src/app/services/customer.service';
import { RoomService } from 'src/app/services/room.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {
  bsValue = new Date();
  roomId = "";
  customerId = "";
  room: RoomModel = new RoomModel();

  customerModel: CustomerModel2 = new CustomerModel2();
  constructor(
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private roomService: RoomService,
    private router: Router
  ) {
    this.utilityService.title = "CUSTOMER CHECKIN";
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.customerId = this.route.snapshot.paramMap.get('customerId');
  }

  ngOnInit(): void {
    this.GetCustomerDetails();
    this.GetRoomById();
  }

  GetCustomerDetails() {
    let cId = 0;
    if (this.customerId) {
      cId = parseInt(this.customerId);
    }

    if (cId == 0) {
      this.utilityService.ShowMsg("Enter valid customer Id", this.utilityService.error);
      return;
    }

    this.customerService.GetCustomerById(cId).subscribe((response: any) => {
      if (response.Succeeded) {
        this.customerModel = response.Data;
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      }
    );
  };

  GetRoomById() {
    this.roomService.GetRoomById(this.roomId).subscribe((response: any) => {
      if (response.Succeeded) {
        this.room = response.Data;
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }

  BookRoom() {
    let bookRoomModel: BookRoomModel = new BookRoomModel();
    bookRoomModel.roomId = this.roomId;
    bookRoomModel.customerId = this.customerId;
    bookRoomModel.checkInTime = '';
    bookRoomModel.checkOutTime = '';

    this.roomService.BookRoom(bookRoomModel).subscribe((response: any) => {
      if (response.Succeeded) {
        this.room = response.Data;
        this.utilityService.ShowMsg('Room booked successfully', this.utilityService.success);
        this.router.navigate(['/rooms/occupied']);
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }
}
