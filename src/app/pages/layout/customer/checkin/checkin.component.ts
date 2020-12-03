import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel, CustomerModel2 } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
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
  customerModel: CustomerModel2 = new CustomerModel2();
  constructor(
    private utilityService: UtilityService,
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.utilityService.title = "CUSTOMER CHECKIN";
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.customerId = this.route.snapshot.paramMap.get('customerId');
  }

  ngOnInit(): void {
    this.GetCustomerDetails();
  }

  GetCustomerDetails() {
    let cId = 0;
    if (this.customerId) {
      cId = parseInt(this.customerId);
    }

    if (cId == 0) {
      alert('enter valid customer Id')
      return;
    }

    this.customerService.GetCustomerById(cId).subscribe((response: any) => {
      if (response.Succeeded) {
        console.log(response.Data);
        this.customerModel = response.Data;
      }
    },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  };
}
