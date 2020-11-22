import { Component } from '@angular/core';
import { UtilityService } from './services/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public utilityService: UtilityService
  ) {
    this.utilityService.title = "Title";
  }
  title = 'Motel';
}
