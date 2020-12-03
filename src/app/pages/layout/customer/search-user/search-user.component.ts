import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CustomerModel2 } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  customers: CustomerModel2[] = [];
  @ViewChild('f') form: FormGroupDirective;

  constructor(
    private customerService: CustomerService,
  ) {}

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
