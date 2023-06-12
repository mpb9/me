import { Component, OnInit } from '@angular/core';
import { UtilityService } from './utility/utility.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UtilityService],
})
export class AppComponent implements OnInit {
  constructor(private utilityService: UtilityService) {}
  ngOnInit() {
    this.utilityService.loadUtilities();
  }
}
