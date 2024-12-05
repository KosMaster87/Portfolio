import { Injectable } from '@angular/core';

/**
 * Service to manage the hamburger menu buttons.
 *
 * This service provides an array of buttons for the hamburger menu, each button
 * is associated with a section in the page. It can be used to dynamically display
 * and navigate between different sections.
 */
@Injectable({
  providedIn: 'root',
})
export class HamburgerMenuService {
  arrBtn: any = [
    { btnName: 'SECTIONS.about', sectionId: 'aboutH1' },
    { btnName: 'SECTIONS.skills', sectionId: 'skills_Component' },
    { btnName: 'SECTIONS.portfolio', sectionId: 'portfolio_Component' },
    { btnName: 'SECTIONS.contact', sectionId: 'linearGradient' },
  ];

  /**
   * Gets the list of menu buttons.
   *
   * @returns {Array} An array of button objects, each containing a `btnName` and a `sectionId`.
   */
  getButtons() {
    return this.arrBtn;
  }
}
