import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomModel } from 'src/app/models/room';
import { RoomService } from 'src/app/services/room.service';

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

  bsValue = new Date();
  maxDate = new Date();
  checkoutForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
  ) {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
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
  }

  CalcTotal() {
    
  }

  GetRoomById() {
    this.roomService.GetRoomById(this.roomId).subscribe((response: any) => {
      if (response.succeeded) {
        this.room = response.data[0];
        console.log('rooms ', this.room);
      }
    },
      (err: HttpErrorResponse) => {
        alert(err.message);
      })
  }
}
