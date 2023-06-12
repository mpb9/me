import { Injectable, EventEmitter } from '@angular/core';
import axios from 'axios';
import { Login, ToDo, Link, PersonalInfo } from './utility.model';
import { CustomMethodService } from '../shared/custom-method.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private logins: Login[] = [];
  private to_do: ToDo[] = [];
  private links: Link[] = [];
  private personalInfo: PersonalInfo[] = [];

  // info: Event Emitters
  loginsChanged = new EventEmitter<Login[]>();
  to_doChanged = new EventEmitter<ToDo[]>();
  linksChanged = new EventEmitter<Link[]>();
  personalInfoChanged = new EventEmitter<PersonalInfo[]>();

  constructor(private customMethods: CustomMethodService) {}

  // info: API callers
  loadUtilities() {
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/get_all.php',
      headers: { 'content-type': 'application/json' },
    })
      .then((result) => {
        this.pushLogins(result.data.logins);
        this.pushTodos(result.data.to_do);
        this.pushLinks(result.data.links);
        this.pushPersonalInfo(result.data.personal_info);
      })
      .catch((error) => console.log(error));
  }

  // info: Push API Data to Arrays
  pushLogins(
    logins: { website: string; username: string; password: string }[]
  ) {
    logins.forEach((login) => {
      this.logins.push(
        new Login(login.website, login.username, login.password)
      );
    });
    this.loginsChanged.emit(this.logins.slice());
  }
  pushTodos(
    to_do: {
      rank: number;
      due: string;
      category: number;
      description: string;
    }[]
  ) {
    to_do.forEach((task) => {
      this.to_do.push(
        new ToDo(task.rank, task.due, task.category, task.description)
      );
    });
    this.to_do.sort((a, b) => a.rank - b.rank);
    this.to_doChanged.emit(this.to_do.slice());
  }
  pushLinks(links: { name: string; url: string }[]) {
    links.forEach((link) => {
      this.links.push(new Link(link.name, link.url));
    });
    this.linksChanged.emit(this.links.slice());
  }
  pushPersonalInfo(personalInfo: { name: string; description: string }[]) {
    personalInfo.forEach((info) => {
      this.personalInfo.push(new PersonalInfo(info.name, info.description));
    });
    this.personalInfoChanged.emit(this.personalInfo.slice());
  }

  // info: Getters
  getLogins() {
    return this.logins.slice();
  }
  getToDo() {
    return this.to_do.slice();
  }
  getLinks() {
    return this.links.slice();
  }
  getPersonalInfo() {
    return this.personalInfo.slice();
  }

  // info: Remove from Arrays
  deleteToDo(index: number) {
    const to_done = this.customMethods.getCopy(this.to_do[index]);
    this.to_do = [];
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/to_do/remove.php',
      headers: { 'content-type': 'application/json' },
      data: to_done,
    })
      .then((result) => {
        console.log(result.data);
        this.pushTodos(result.data);
      })
      .catch((error) => console.log(error));
  }
}
