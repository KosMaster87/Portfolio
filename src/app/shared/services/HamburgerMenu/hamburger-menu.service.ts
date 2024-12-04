import { Injectable } from '@angular/core';

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

  getButtons() {
    return this.arrBtn;
  }
}
