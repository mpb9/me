import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .home-page {
        background-color: black;
        min-height: 94vh;
        max-height: max-content;
        width: 100%;
        padding: 10px 0px 0px 35px;
        margin: 0px;
        box-shadow: 0px 1px 3px 4px rgba(127, 239, 9, 0.8);
        font-family: 'video game', monospace;
        color: rgb(0 0 0);
      }
      .title-row {
        text-align: right;
        font-style: italic;
        padding: 5px 0px 5px 0px;
        margin-right: 30px;
        font-size: 26px;
        text-shadow: 2px -1px 1px rgba(128, 187, 110, 0.9),
          1px 0px 0.1em rgb(144 255 33 / 80%), 1px 0 0.2em yellow;
        cursor: default;
      }
      .title-row > b {
        font-style: normal;
        margin-left: -15px;
        font-size: 25px;
        font-weight: inherit;
        color: rgb(127 239 9);
        text-shadow: 1px -1px 0.8px black, -1px 0px 0.06em yellow,
          -2px 0 0.2em #85c16b;
      }
      .dir-row {
        text-align: left;
        font-style: italic;
        padding: 5px 0px 5px 5px;
        font-size: 24px;
        text-shadow: 2px -1px 1px rgba(128, 187, 110, 0.9),
          1px 0px 0.1em rgb(144 255 33 / 80%), 1px 0 0.2em yellow;
        cursor: default;
      }
      .sub-row {
        text-align: left;
        font-style: normal;
        padding: 5px 0px 5px 25px;
        font-size: 22px;
        color: rgb(127 239 9);
        text-shadow: 1px -1px 0.8px black, -1px 0px 0.06em yellow,
          -2px 0 0.2em #85c16b;
        cursor: default;
      }
      .go {
        color: rgb(0 0 0);
        font-style: italic;
        text-shadow: 2px -1px 1px rgba(128, 187, 110, 0.9),
          1px 0px 0.1em rgb(144 255 33 / 80%), 1px 0 0.2em yellow;
      }
      .go:hover {
        color: rgba(127, 239, 9, 0.5);
        font-style: normal;
        text-shadow: 1px -1px 0.8px black, -1px 0px 0.06em yellow,
          -2px 0 0.2em #85c16b;
        cursor: pointer;
      }
      .sub-sub-row {
        text-align: left;
        font-style: italic;
        padding: 5px 0px 5px 50px;
        font-size: 20px;
        color: rgb(127 239 9);
        text-shadow: 1px -1px 0.8px black, -1px 0px 0.06em yellow,
          -2px 0 0.2em #85c16b;
        cursor: default;
      }
    `,
  ],
})
export class HomeComponent {
  expandFavs = 'enter?';
}
