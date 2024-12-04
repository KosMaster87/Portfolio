import { Component, inject } from '@angular/core';
import { NoScrollDirective } from './../../directives/no-Scroll/no-scroll.directive';
import { MenuButtonComponent } from './../menu-button/menu-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { HamburgerMenuService } from '../../../shared/services/HamburgerMenu/hamburger-menu.service';

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

  ngOnInit(): void {
    this.arrBtn = this.hamburgerMenuService.getButtons();
  }

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
