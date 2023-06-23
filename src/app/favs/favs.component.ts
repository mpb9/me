import { Component } from '@angular/core';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styles: [
    `
      .title-row {
        text-align: center;
        margin-bottom: 5px;
        font-family: 'sci-fi ultra', monospace;
        font-size: 25px;
        text-decoration: underline 3px rgb(232, 91, 44);
        color: rgb(232, 91, 44);
        text-shadow: 2px -1px 1px rgba(128, 187, 110, 0.9),
          1px 0px 0.1em rgb(144 255 33 / 80%), 1px 0 0.2em yellow;
        cursor: default;
      }
      .sub-pages {
        margin: 0px 3% 10px 3%;
        background-color: rgba(255, 255, 0, 0.6);
        width: 94%;
        border: 4px solid;
        border-radius: 10px;
        border-image: linear-gradient(
            to top,
            rgba(255, 255, 0, 0),
            darkseagreen 35%,
            rgb(232, 91, 44)
          )
          3;
      }
      .sub-page-col {
        display: inline-block;
        text-align: center;
        vertical-align: top;
        font-size: 19px;
        width: 33.33%;
        padding: 0px 0px 5px 0px;
      }
      .sub-page-col:hover {
        background-image: linear-gradient(
          0deg,
          rgba(255, 255, 0, 0),
          darkseagreen 35%,
          rgb(232, 91, 44)
        );
      }
      .sub-page-category {
        font-family: 'video game', monospace;
        color: yellow;
        text-shadow: -1px 1px 1px rgb(192 200 64), 1px 0px 0.1em rgb(33 255 65),
          2px 2px 0.1em darkmagenta;
        background-image: linear-gradient(0deg, #bf8658, rgb(232, 91, 44));
        border-radius: 0px 0px 20px 20px;
        padding: 5px 0px;
        cursor: default;
        box-shadow: 0px 4px 0.1em rgba(0, 0, 0, 0.6);
      }
      .sub-page-col:hover > .sub-page-category {
        background-image: none;
      }
      .sub-page-link {
        width: 100%;
        font-family: 'sci-fi curvy', monospace;
        font-weight: 900;
        margin: 4px 0px 6px 0px;
        color: rgb(232, 91, 44);
        text-shadow: 0px -1px 1px rgba(128, 187, 110, 0.9),
          1px 0px 0.1em rgb(144 255 33 / 80%), 1px 0 0.2em yellow;
        font-style: italic;
        letter-spacing: 2px;
      }
      .sub-page-link:hover {
        text-shadow: -1px 1px 1px rgb(192 200 64), 1px 0px 0.1em rgb(33 255 65),
          2px 2px 0.1em darkmagenta;
        font-family: 'video game', monospace;
        letter-spacing: 0px;
        cursor: pointer;
      }
    `,
  ],
})
export class FavsComponent {}
