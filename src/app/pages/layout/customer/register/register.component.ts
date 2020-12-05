import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryModel, StateModel } from 'src/app/models/country';
import { CustomerModel } from 'src/app/models/customer';
import { DocumentModel } from 'src/app/models/document';
import { CountryService } from 'src/app/services/country.service';
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
  countryList: CountryModel[] = [];
  stateList: StateModel[] = [];
  countryName: string = '';

  constructor(
    private countryService: CountryService,
    private documentService: DocumentService,
    private customerService: CustomerService,
    public utilityService: UtilityService
  ) {
    this.utilityService.title = 'NEW USER';
  }

  ngOnInit(): void {
    this.GetCountries();
    this.GetDocuments();
  }

  onSubmit(form: NgForm) {
    this.customer.country = this.countryName;
    this.AddCustomer(this.customer);
  }

  GetCountries() {
    this.countryService.GetCountries().subscribe((data) => {
      this.countryList = data;
    });
  }

  GetStates(val) {
    this.countryService.GetStates().subscribe((data) => {
      this.stateList = data.filter((item) => item.CountryCode == val);
    });
  }

  changeCountry(e) {
    this.countryName = e.target.options[e.target.options.selectedIndex].text;
    this.GetStates(e.target.value);
  }

  GetDocuments() {
    this.documentService.GetDocuments().subscribe(
      (response: any) => {
        if (response.Succeeded) {
          this.documents = response.Data;
        }
      },
      (err: HttpErrorResponse) => {
        //alert(err.message);
      }
    );
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
  }
}
