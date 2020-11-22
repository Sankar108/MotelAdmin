import { Component, OnInit } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public utilityService: UtilityService
  ) {
    this.utilityService.title = "Login";
  }

  ngOnInit(): void {
  }

}
