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
    logins: {
      website: string;
      url: string;
      username: string;
      password: string;
    }[]
  ) {
    logins.forEach((login) => {
      this.logins.push(
        new Login(login.website, login.url, login.username, login.password)
      );
    });
    this.loginsChanged.emit(this.logins.slice());
  }
  pushTodos(
    to_do: {
      rank: number;
      due: string;
      category: string;
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

  // info: Add to Arrays
  addLogin(login: Login) {
    this.logins = [];
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/logins/add.php',
      headers: { 'content-type': 'application/json' },
      data: login,
    })
      .then((result) => {
        console.log(result.data);
        this.pushLogins(result.data);
      })
      .catch((error) => console.log(error));
  }
  addToDo(to_do: ToDo) {
    this.to_do = [];
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/to_do/add.php',
      headers: { 'content-type': 'application/json' },
      data: to_do,
    })
      .then((result) => {
        console.log(result.data);
        this.pushTodos(result.data);
      })
      .catch((error) => console.log(error));
  }
  addLink(link: Link) {
    this.links = [];
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/links/add.php',
      headers: { 'content-type': 'application/json' },
      data: link,
    })
      .then((result) => {
        console.log(result.data);
        this.pushLinks(result.data);
      })
      .catch((error) => console.log(error));
  }
  addPersonalInfo(personalInfo: PersonalInfo) {
    this.personalInfo = [];
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/personal_info/add.php',
      headers: { 'content-type': 'application/json' },
      data: personalInfo,
    })
      .then((result) => {
        console.log(result.data);
        this.pushPersonalInfo(result.data);
      })
      .catch((error) => console.log(error));
  }

  // info: Remove from Arrays
  deleteLogin(index: number) {
    const login = this.customMethods.getCopy(this.logins[index]);
    this.logins = [];
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/logins/remove.php',
      headers: { 'content-type': 'application/json' },
      data: login,
    })
      .then((result) => {
        console.log(result.data);
        this.pushLogins(result.data);
      })
      .catch((error) => console.log(error));
  }
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
  deleteLink(index: number) {
    const link = this.customMethods.getCopy(this.links[index]);
    this.links = [];
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/links/remove.php',
      headers: { 'content-type': 'application/json' },
      data: link,
    })
      .then((result) => {
        console.log(result.data);
        this.pushLinks(result.data);
      })
      .catch((error) => console.log(error));
  }
  deletePersonalInfo(index: number) {
    const personalInfo = this.customMethods.getCopy(this.personalInfo[index]);
    this.personalInfo = [];
    axios({
      method: 'post',
      url: 'http://localhost/me-apis/utility/personal_info/remove.php',
      headers: { 'content-type': 'application/json' },
      data: personalInfo,
    })
      .then((result) => {
        console.log(result.data);
        this.pushPersonalInfo(result.data);
      })
      .catch((error) => console.log(error));
  }
}
