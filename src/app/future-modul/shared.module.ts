import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallActionButtonComponent } from './components/call-action-button/call-action-button.component';
import { ToUpperCase } from './pipes/toUpperCase.pipe';
import { HighlightingDirective } from './directives/highlighting/highlighting.directive';
import { IconHoverDirective } from './directives/icon-hover/icon-hover.directive';
import { NoScrollDirective } from './directives/no-Scroll/no-scroll.directive';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { ButtonContactComponent } from './components/button-contact/button-contact.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonContactComponent,
    CallActionButtonComponent,
    ToUpperCase,
    HighlightingDirective,
    IconHoverDirective,
    NoScrollDirective,
    MenuButtonComponent,
  ],
  exports: [
    HighlightingDirective,
    ButtonContactComponent,
    CallActionButtonComponent,
    ToUpperCase,
    IconHoverDirective,
  ],
})
export class SharedModule {}
