import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Component that represents a menu button.
 *
 * This component is used to display a button in the menu. When clicked, it toggles
 * the `isBtnClicked` state and can trigger actions such as scrolling to a specific section.
 */
@Component({
  selector: 'app-menu-button',
  imports: [],
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {
  @Input() btnName!: string;
  @Input() sectionId!: string;
  private router: Router = inject(Router);
  isBtnClicked: boolean = false;

  /**
   * This method is triggered when the button is clicked.
   *
   * It sets the `isBtnClicked` flag to `true` and then resets it back to `false` after 1 second.
   *
   * @memberof MenuButtonComponent
   */
  clickedBtn() {
    this.isBtnClicked = true;

    this.router.navigate(['/'], { fragment: this.sectionId });

    setTimeout(() => {
      this.isBtnClicked = false;
    }, 1000);
  }
}
