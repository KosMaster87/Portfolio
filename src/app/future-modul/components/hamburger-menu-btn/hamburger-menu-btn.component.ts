import { Component, inject } from '@angular/core';
import { NoScrollDirective } from './../../directives/no-Scroll/no-scroll.directive';
import { MenuButtonComponent } from './../menu-button/menu-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { HamburgerMenuService } from '../../../shared/services/HamburgerMenu/hamburger-menu.service';

/**
 * Component that represents the hamburger menu button.
 *
 * This component displays the hamburger menu button, manages the menu's state, and handles
 * scrolling to different sections when a menu button is clicked.
 */
@Component({
  selector: 'app-hamburger-menu-btn',
  imports: [NoScrollDirective, MenuButtonComponent, TranslateModule],
  templateUrl: './hamburger-menu-btn.component.html',
  styleUrl: './hamburger-menu-btn.component.scss',
})
export class HamburgerMenuBtnComponent {
  arrBtn: any = [];
  private hamburgerMenuService: HamburgerMenuService =
    inject(HamburgerMenuService);

  /**
   * Initializes the component and loads the list of menu buttons from the HamburgerMenuService.
   *
   * @memberof HamburgerMenuBtnComponent
   */
  ngOnInit(): void {
    this.arrBtn = this.hamburgerMenuService.getButtons();
  }

  /**
   * Handles the click event of a menu button.
   *
   * This method is responsible for closing the hamburger menu (by unchecking the menu input)
   * and scrolling the page to the selected section with smooth animation.
   *
   * @param {string} sectionId The ID of the section to scroll to.
   * @memberof HamburgerMenuBtnComponent
   */
  onMenuBtnClick(sectionId: string) {
    const menuInput = document.getElementById('menuInput') as HTMLInputElement;

    setTimeout(() => {
      if (menuInput) {
        menuInput.checked = false;
      }

      const body = document.body;
      body.classList.remove('no-scroll');

      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  }
}
