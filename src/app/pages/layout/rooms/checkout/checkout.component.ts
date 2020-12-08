import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomModel } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('frm') form: FormGroupDirective;
  roomId = '';
  room: RoomModel;
  totalCharge = 0;
  submitted = false;
  charge = '0';
  extraCharge = '0';
  bsValue = new Date();
  maxDate = new Date();
  checkoutForm: FormGroup;
  customerId = '';

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private router:Router
  ) {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.customerId = this.route.snapshot.paramMap.get('customerId');

    this.maxDate.setDate(this.maxDate.getDate() + 7);
  }

  ngOnInit(): void {
    this.GetRoomById();
    this.checkoutForm = this.formBuilder.group({
      roomCharge: ['', [Validators.required, Validators.minLength(2)]],
      extraCharge: ['', [Validators.required]],
      totalCharge: ['', [Validators.required]],
      cDate: ['', [Validators.required]],
    },
    );
  }

  onSubmit() {
    this.submitted = true;
    this.CheckOutRoom();
  }

  CalcTotal() {
    this.totalCharge = parseInt(this.charge) + parseInt(this.extraCharge);
  }

  GetRoomById() {
    this.roomService.GetRoomById(this.roomId).subscribe((response: any) => {
      if (response.Succeeded) {
        this.room = response.Data;
        console.log('rooms ', this.room);
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }

  CheckOutRoom() {
    this.roomService.CheckOutRoom(this.roomId, this.customerId).subscribe((response: any) => {
      if (response.Succeeded) {
        this.utilityService.ShowMsg(response.Message, this.utilityService.success);
        this.router.navigate(['/rooms/underclining'])
      }
    },
      (error: HttpErrorResponse) => {
        this.utilityService.ShowMsg(error.message, this.utilityService.error);
      })
  }
}
