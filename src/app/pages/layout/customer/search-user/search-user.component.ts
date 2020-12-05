import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel2 } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  customers: CustomerModel2[] = [];
  customerModel: CustomerModel2 = new CustomerModel2();
  roomId = "";
  customerId = "";

  @ViewChild('f') form: FormGroupDirective;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
  }

  ngOnInit(): void {
    this.GetCustomerList()
  }

  GetCustomerList() {
    this.customerService.GetCustomerList().subscribe(
      (response: any) => {
        if (response.Succeeded) {
          console.log(response.Data);
          this.customers = response.Data;
        }
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  };

}
