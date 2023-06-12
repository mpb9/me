import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';
import { ToDo } from '../utility.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['../utility.css'],
})
export class ToDoComponent implements OnInit {
  to_do!: ToDo[];
  to_do_input: ToDo = new ToDo(0, '', '', '');

  constructor(private utilityService: UtilityService, public router: Router) {}

  ngOnInit() {
    this.to_do = this.utilityService.getToDo();
    this.utilityService.to_doChanged.subscribe((to_do) => {
      this.to_do = to_do;
    });
  }

  updateInput(event: any, property: string) {
    if (property === 'rank') {
      this.to_do_input.rank = event.target.value;
    } else if (property === 'due') {
      this.to_do_input.due = event.target.value;
    } else if (property === 'category') {
      this.to_do_input.category = event.target.value;
    } else if (property === 'description') {
      this.to_do_input.description = event.target.value;
    }
  }

  addToDo() {
    this.to_do = [];
    this.utilityService.addToDo(this.to_do_input);
    this.to_do_input = new ToDo(0, '', '', '');
  }

  toDone(rank: number) {
    const index = this.to_do.findIndex((to_do) => to_do.rank === rank);
    this.to_do = [];
    this.utilityService.deleteToDo(index);
  }

  sortBy(sort: string, rank: number) {
    if (sort === 'rank') {
      this.to_do.sort((a, b) => {
        if (a.rank > b.rank) {
          return rank;
        } else if (a.rank < b.rank) {
          return -rank;
        } else {
          return 0;
        }
      });
    } else if (sort === 'due') {
      this.to_do.sort((a, b) => {
        if (a.due > b.due) {
          return rank;
        } else if (a.due < b.due) {
          return -rank;
        } else {
          return 0;
        }
      });
    } else if (sort === 'category') {
      this.to_do.sort((a, b) => {
        if (a.category > b.category) {
          return rank;
        } else if (a.category < b.category) {
          return -rank;
        } else {
          return 0;
        }
      });
    }
  }
}
