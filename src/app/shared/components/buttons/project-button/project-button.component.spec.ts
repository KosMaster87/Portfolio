import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectButtonComponent } from './project-button.component';
import { SmoothScrollService } from '@core/services';

describe('ProjectButtonComponent', () => {
  let component: ProjectButtonComponent;
  let fixture: ComponentFixture<ProjectButtonComponent>;
  let smoothScrollServiceSpy: jasmine.SpyObj<SmoothScrollService>;

  beforeEach(() => {
    smoothScrollServiceSpy = jasmine.createSpyObj('SmoothScrollService', ['scrollElementToCenter']);

    TestBed.configureTestingModule({
      imports: [ProjectButtonComponent],
      providers: [{ provide: SmoothScrollService, useValue: smoothScrollServiceSpy }],
    });

    fixture = TestBed.createComponent(ProjectButtonComponent);
    component = fixture.componentInstance;
  });

  describe('Component creation', () => {
    it('should create with required label', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });

  describe('label input', () => {
    it('should accept and reflect label value', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      expect(component.label()).toBe('View Project');
    });

    it('should accept different label values', () => {
      fixture.componentRef.setInput('label', 'Learn More');
      fixture.detectChanges();

      expect(component.label()).toBe('Learn More');
    });

    it('should accept localized labels', () => {
      fixture.componentRef.setInput('label', 'Projekt ansehen');
      fixture.detectChanges();

      expect(component.label()).toBe('Projekt ansehen');
    });
  });

  describe('click output', () => {
    it('should emit click event when button is clicked', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      let emitted = false;
      component.click.subscribe(() => {
        emitted = true;
      });

      component['handleClick']();

      expect(emitted).toBe(true);
    });

    it('should emit click event multiple times', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      let emitCount = 0;
      component.click.subscribe(() => {
        emitCount++;
      });

      component['handleClick']();
      component['handleClick']();
      component['handleClick']();

      expect(emitCount).toBe(3);
    });
  });

  describe('handleClick()', () => {
    it('should emit click output', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      spyOn(component.click, 'emit');

      component['handleClick']();

      expect(component.click.emit).toHaveBeenCalled();
    });

    it('should emit without arguments', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      spyOn(component.click, 'emit');

      component['handleClick']();

      expect(component.click.emit).toHaveBeenCalledWith();
    });
  });

  describe('handleFocus()', () => {
    it('should call scrollElementToCenter when button is focused and card exists', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const card = document.createElement('div');
      card.classList.add('project-card');
      const button = document.createElement('button');
      card.appendChild(button);
      document.body.appendChild(card);

      const event = new FocusEvent('focus');
      Object.defineProperty(event, 'target', { value: button, writable: false });

      component['handleFocus'](event);

      expect(smoothScrollServiceSpy.scrollElementToCenter).toHaveBeenCalledWith(card, 1000);

      document.body.removeChild(card);
    });

    it('should not call scrollElementToCenter when no parent card exists', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const button = document.createElement('button');
      document.body.appendChild(button);

      const event = new FocusEvent('focus');
      Object.defineProperty(event, 'target', { value: button, writable: false });

      component['handleFocus'](event);

      expect(smoothScrollServiceSpy.scrollElementToCenter).not.toHaveBeenCalled();

      document.body.removeChild(button);
    });

    it('should use 1000ms duration for scroll', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const card = document.createElement('div');
      card.classList.add('project-card');
      const button = document.createElement('button');
      card.appendChild(button);
      document.body.appendChild(card);

      const event = new FocusEvent('focus');
      Object.defineProperty(event, 'target', { value: button, writable: false });

      component['handleFocus'](event);

      expect(smoothScrollServiceSpy.scrollElementToCenter).toHaveBeenCalledWith(
        jasmine.any(HTMLElement),
        1000
      );

      document.body.removeChild(card);
    });

    it('should find closest project-card parent', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const card = document.createElement('div');
      card.classList.add('project-card');
      const wrapper = document.createElement('div');
      const button = document.createElement('button');
      wrapper.appendChild(button);
      card.appendChild(wrapper);
      document.body.appendChild(card);

      const event = new FocusEvent('focus');
      Object.defineProperty(event, 'target', { value: button, writable: false });

      component['handleFocus'](event);

      expect(smoothScrollServiceSpy.scrollElementToCenter).toHaveBeenCalledWith(card, 1000);

      document.body.removeChild(card);
    });
  });

  describe('DOM rendering', () => {
    it('should render button element', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.project-button');

      expect(button).toBeTruthy();
    });

    it('should have type button', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.project-button');

      expect(button.getAttribute('type')).toBe('button');
    });

    it('should display label text', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.project-button');

      expect(button.textContent.trim()).toBe('View Project');
    });

    it('should update label when input changes', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      let button = fixture.nativeElement.querySelector('button.project-button');
      expect(button.textContent.trim()).toBe('View Project');

      fixture.componentRef.setInput('label', 'Learn More');
      fixture.detectChanges();

      button = fixture.nativeElement.querySelector('button.project-button');
      expect(button.textContent.trim()).toBe('Learn More');
    });

    it('should have project-button class', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');

      expect(button.classList.contains('project-button')).toBe(true);
    });
  });

  describe('Event listeners', () => {
    it('should call handleClick when button is clicked', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      spyOn<any>(component, 'handleClick');

      const button = fixture.nativeElement.querySelector('button.project-button');
      button.click();

      expect(component['handleClick']).toHaveBeenCalled();
    });

    it('should emit click output when button is clicked', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      let emitted = false;
      component.click.subscribe(() => {
        emitted = true;
      });

      const button = fixture.nativeElement.querySelector('button.project-button');
      button.click();

      expect(emitted).toBe(true);
    });

    it('should call handleFocus when button is focused', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      spyOn<any>(component, 'handleFocus');

      const button = fixture.nativeElement.querySelector('button.project-button');
      button.dispatchEvent(new FocusEvent('focus'));

      expect(component['handleFocus']).toHaveBeenCalled();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty string label', () => {
      fixture.componentRef.setInput('label', '');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.project-button');

      expect(button.textContent.trim()).toBe('');
    });

    it('should handle long label text', () => {
      const longLabel = 'View This Amazing Project With A Very Long Label';
      fixture.componentRef.setInput('label', longLabel);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.project-button');

      expect(button.textContent.trim()).toBe(longLabel);
    });

    it('should handle multiple rapid clicks', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      let emitCount = 0;
      component.click.subscribe(() => {
        emitCount++;
      });

      const button = fixture.nativeElement.querySelector('button.project-button');
      button.click();
      button.click();
      button.click();

      expect(emitCount).toBe(3);
    });

    it('should handle focus without parent card gracefully', () => {
      fixture.componentRef.setInput('label', 'View Project');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.project-button');
      button.dispatchEvent(new FocusEvent('focus'));

      expect(smoothScrollServiceSpy.scrollElementToCenter).not.toHaveBeenCalled();
    });

    it('should handle special characters in label', () => {
      fixture.componentRef.setInput('label', 'Project <>&"\'');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button.project-button');

      expect(button.textContent.trim()).toBe('Project <>&"\'');
    });
  });
});
