import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { ToDo } from '../utility.model';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  to_do!: ToDo[];

  constructor(private utilityService: UtilityService) {}

  ngOnInit() {
    this.utilityService.to_doChanged.subscribe((to_do) => {
      this.to_do = to_do;
    });
  }
}
