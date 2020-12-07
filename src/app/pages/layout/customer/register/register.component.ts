import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CountryModel, StateModel } from 'src/app/models/country';
import { CustomerModel } from 'src/app/models/customer';
import { DocumentModel } from 'src/app/models/document';
import { RoomModel } from 'src/app/models/room';
import { CountryService } from 'src/app/services/country.service';
import { CustomerService } from 'src/app/services/customer.service';
import { DocumentService } from 'src/app/services/document.service';
import { RoomService } from 'src/app/services/room.service';
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
  room: RoomModel = <RoomModel>{};
  countryName: string = '';
  roomId = '';

  constructor(
    private countryService: CountryService,
    private documentService: DocumentService,
    private customerService: CustomerService,
    public utilityService: UtilityService,
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {
    this.utilityService.title = 'Motel';
    this.roomId = this.route.snapshot.paramMap.get('roomId');
  }

  ngOnInit(): void {
    this.GetRoomById();
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
    this.utilityService.showLoader();
    this.documentService.GetDocuments().subscribe(
      (response: any) => {
        this.utilityService.hideLoader();
        if (response.Succeeded) {
          this.documents = response.Data;
        }
      },
      (err: HttpErrorResponse) => {
        this.utilityService.hideLoader();
        this.utilityService.ShowMsg(err.message, this.utilityService.error);
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

  GetRoomById() {
    this.utilityService.showLoader();
    this.roomService.GetRoomById1(this.roomId).subscribe(
      (response: any) => {
        this.utilityService.hideLoader();
        if (response.Succeeded) {
          this.room = response.Data;
          console.log('rooms ', this.room);
        }
      },
      (err: HttpErrorResponse) => {
        this.utilityService.hideLoader();
        this.utilityService.ShowMsg(err.message, this.utilityService.error);
      }
    );
  }
}
