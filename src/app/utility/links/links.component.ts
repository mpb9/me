import { Component, OnInit } from '@angular/core';
import { Link } from '../utility.model';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['../utility.css'],
})
export class LinksComponent implements OnInit {
  links!: Link[];
  link_input: Link = new Link('', '');

  constructor(private utilityService: UtilityService) {}

  ngOnInit() {
    this.links = this.utilityService.getLinks();
    this.utilityService.linksChanged.subscribe((links) => {
      this.links = links;
    });
  }

  async goToLink(url: string) {
    window.open(url, '_blank');
  }

  updateInput(event: any, property: string) {
    if (property === 'name') {
      this.link_input.name = event.target.value;
    } else if (property === 'url') {
      this.link_input.url = event.target.value;
    }
    console.log(this.link_input);
  }

  addLink() {
    this.links = [];
    this.utilityService.addLink(this.link_input);
    this.link_input = new Link('', '');
  }

  deleteLink(url: string) {
    const index = this.links.findIndex((link) => link.url === url);
    this.links = [];
    this.utilityService.deleteLink(index);
  }

  sortBy(sort: string) {
    if (sort === 'name') {
      this.links.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      this.links.sort((a, b) => {
        if (a.url > b.url) {
          return 1;
        } else if (a.url < b.url) {
          return -1;
        } else {
          return 0;
        }
      });
    }
  }
}
