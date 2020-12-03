import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer';
import { DocumentModel } from 'src/app/models/document';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentService } from 'src/app/services/document.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  customer: CustomerModel = <CustomerModel>{};
  documents: DocumentModel[] = [];

  constructor(
    private documentService: DocumentService,
    private customerService: CustomerService,
    public utilityService: UtilityService
  ) {
    this.utilityService.title = 'NEW USER';
  }

  ngOnInit(): void {
    this.GetDocuments();
  }

  onSubmit(form: NgForm) {
    console.log(this.customer);
    this.AddCustomer(this.customer);
  }

  GetDocuments() {
    this.documentService.GetDocuments().subscribe((response: any) => {
      if (response.Succeeded) {
        this.documents = response.Data;
        console.log('documents ', this.documents);
      }
    },
      (err: HttpErrorResponse) => {
        alert(err.message);
        console.log(err.message);
      })
  }

  AddCustomer(customer: CustomerModel) {
    this.customerService.AddCustomer(customer).subscribe(
      (response: any) => {
        if (response.succeeded) {
          console.log(response.data);
        }
      },
      (err: HttpErrorResponse) => {
        alert(err.message);
      }
    );
  };
}
