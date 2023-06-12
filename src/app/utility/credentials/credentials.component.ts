import { Component, OnInit } from '@angular/core';
import { Login, PersonalInfo } from '../utility.model';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['../utility.css'],
})
export class CredentialsComponent implements OnInit {
  showing: 'Logins' | 'Personal Info' = 'Logins';
  logins!: Login[];
  personalInfo!: PersonalInfo[];
  login_input: Login = new Login('', '', '', '');
  personal_info_input: PersonalInfo = new PersonalInfo('', '');

  constructor(private utilityService: UtilityService) {}

  ngOnInit() {
    this.logins = this.utilityService.getLogins();
    this.utilityService.loginsChanged.subscribe((logins) => {
      this.logins = logins;
    });

    this.personalInfo = this.utilityService.getPersonalInfo();
    this.utilityService.personalInfoChanged.subscribe((personalInfo) => {
      this.personalInfo = personalInfo;
    });
  }

  changePage() {
    if (this.showing === 'Logins') {
      this.showing = 'Personal Info';
      this.login_input = new Login('', '', '', '');
    } else {
      this.showing = 'Logins';
      this.personal_info_input = new PersonalInfo('', '');
    }
  }

  updateInput(event: any, property: string) {
    if (this.showing === 'Logins') {
      if (property === 'website') {
        this.login_input.website = event.target.value;
      } else if (property === 'url') {
        this.login_input.url = event.target.value;
      } else if (property === 'username') {
        this.login_input.username = event.target.value;
      } else if (property === 'password') {
        this.login_input.password = event.target.value;
      }
    } else {
      if (property === 'name') {
        this.personal_info_input.name = event.target.value;
      } else if (property === 'description') {
        this.personal_info_input.description = event.target.value;
      }
    }
  }

  addLogin() {
    this.logins = [];
    this.utilityService.addLogin(this.login_input);
    this.login_input = new Login('', '', '', '');
  }

  addPersonalInfo() {
    this.personalInfo = [];
    this.utilityService.addPersonalInfo(this.personal_info_input);
    this.personal_info_input = new PersonalInfo('', '');
  }

  deleteLogin(url: string) {
    const index = this.logins.findIndex((login) => login.url === url);
    this.logins = [];
    this.utilityService.deleteLogin(index);
  }

  deletePersonalInfo(name: string) {
    const index = this.personalInfo.findIndex(
      (personalInfo) => personalInfo.name === name
    );
    this.personalInfo = [];
    this.utilityService.deletePersonalInfo(index);
  }

  sortBy(sort: string) {
    if (this.showing === 'Logins') {
      if (sort === 'website') {
        this.logins.sort((a, b) => {
          if (a.website > b.website) {
            return 1;
          } else if (a.website < b.website) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (sort === 'url') {
        this.logins.sort((a, b) => {
          if (a.url > b.url) {
            return 1;
          } else if (a.url < b.url) {
            return -1;
          } else {
            return 0;
          }
        });
      } else if (sort === 'username') {
        this.logins.sort((a, b) => {
          if (a.username > b.username) {
            return 1;
          } else if (a.username < b.username) {
            return -1;
          } else {
            return 0;
          }
        });
      } else {
        this.logins.sort((a, b) => {
          if (a.password > b.password) {
            return 1;
          } else if (a.password < b.password) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    } else {
      if (sort === 'name') {
        this.personalInfo.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else {
            return 0;
          }
        });
      } else {
        this.personalInfo.sort((a, b) => {
          if (a.description > b.description) {
            return 1;
          } else if (a.description < b.description) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    }
  }

  async openLoginURL(index: number) {
    const url = this.logins[index].url;
    const password = this.logins[index].password;

    await this.copyToClipboard(password);
    window.open(url, '_blank');
  }
  async copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }
}
