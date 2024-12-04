import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {
  @Input() btnName!: string;
  @Input() sectionId!: string;

  isBtnClicked: boolean = false;

  clickedBtn() {
    this.isBtnClicked = true;

    setTimeout(() => {
      this.isBtnClicked = false;
    }, 1000);
  }
}
