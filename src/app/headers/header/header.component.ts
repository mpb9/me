import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Link, Login, ToDo, PersonalInfo } from 'src/app/utility/utility.model';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  links!: Link[];
  logins!: Login[];
  to_do!: ToDo[];
  personalInfo!: PersonalInfo[];

  constructor(private utilityService: UtilityService, public router: Router) {}

  ngOnInit() {
    this.utilityService.linksChanged.subscribe((links) => {
      this.links = links;
    });
    this.utilityService.loginsChanged.subscribe((logins) => {
      this.logins = logins;
    });
    this.utilityService.to_doChanged.subscribe((to_do) => {
      this.to_do = to_do;
    });
    this.utilityService.personalInfoChanged.subscribe((personalInfo) => {
      this.personalInfo = personalInfo;
    });
  }

  toDone(rank: number) {
    const index = this.to_do.findIndex((to_do) => to_do.rank === rank);
    this.utilityService.deleteToDo(index);
    this.router.navigate(['']);
  }
}
