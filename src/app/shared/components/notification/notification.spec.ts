import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationComponent],
    });

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
  });

  describe('Component creation', () => {
    it('should create with required inputs', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test message');
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });
  });

  describe('show input', () => {
    it('should accept and reflect show value', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      expect(component.show()).toBe(true);
    });

    it('should accept false value', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      expect(component.show()).toBe(false);
    });
  });

  describe('message input', () => {
    it('should accept and reflect message value', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Success message');
      fixture.detectChanges();

      expect(component.message()).toBe('Success message');
    });

    it('should accept different messages', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Error occurred');
      fixture.detectChanges();

      expect(component.message()).toBe('Error occurred');
    });
  });

  describe('type input', () => {
    it('should have default value success', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      expect(component.type()).toBe('success');
    });

    it('should accept success value', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('type', 'success');
      fixture.detectChanges();

      expect(component.type()).toBe('success');
    });

    it('should accept error value', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('type', 'error');
      fixture.detectChanges();

      expect(component.type()).toBe('error');
    });
  });

  describe('duration input', () => {
    it('should have default value 5000', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      expect(component.duration()).toBe(5000);
    });

    it('should accept custom duration', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 3000);
      fixture.detectChanges();

      expect(component.duration()).toBe(3000);
    });

    it('should accept different duration values', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 10000);
      fixture.detectChanges();

      expect(component.duration()).toBe(10000);
    });
  });

  describe('actionText input', () => {
    it('should have default empty string', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      expect(component.actionText()).toBe('');
    });

    it('should accept action text', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      expect(component.actionText()).toBe('Retry');
    });

    it('should accept different action texts', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Undo');
      fixture.detectChanges();

      expect(component.actionText()).toBe('Undo');
    });
  });

  describe('Auto-dismiss', () => {
    it('should emit closed after duration when show is true', (done) => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 100);
      fixture.detectChanges();

      component.closed.subscribe(() => {
        done();
      });

      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
    });

    it('should use custom duration for auto-dismiss', (done) => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 50);
      fixture.detectChanges();

      const startTime = Date.now();
      component.closed.subscribe(() => {
        const elapsed = Date.now() - startTime;
        expect(elapsed).toBeGreaterThanOrEqual(45);
        done();
      });

      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
    });

    it('should not auto-dismiss when show is false', (done) => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 50);
      fixture.detectChanges();

      let emitted = false;
      component.closed.subscribe(() => {
        emitted = true;
      });

      setTimeout(() => {
        expect(emitted).toBe(false);
        done();
      }, 100);
    });

    it('should clear previous timeout when show changes to true again', (done) => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 100);
      fixture.detectChanges();

      let emitCount = 0;
      component.closed.subscribe(() => {
        emitCount++;
      });

      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();

      setTimeout(() => {
        fixture.componentRef.setInput('show', false);
        fixture.detectChanges();
        fixture.componentRef.setInput('show', true);
        fixture.detectChanges();

        setTimeout(() => {
          expect(emitCount).toBe(1);
          done();
        }, 150);
      }, 50);
    });
  });

  describe('onClose()', () => {
    it('should emit closed output', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      let emitted = false;
      component.closed.subscribe(() => {
        emitted = true;
      });

      component.onClose();

      expect(emitted).toBe(true);
    });

    it('should clear auto-dismiss timeout', (done) => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 100);
      fixture.detectChanges();

      let emitCount = 0;
      component.closed.subscribe(() => {
        emitCount++;
      });

      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();

      setTimeout(() => {
        component.onClose();

        setTimeout(() => {
          expect(emitCount).toBe(1);
          done();
        }, 100);
      }, 50);
    });

    it('should emit without arguments', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      spyOn(component.closed, 'emit');

      component.onClose();

      expect(component.closed.emit).toHaveBeenCalledWith();
    });
  });

  describe('onAction()', () => {
    it('should emit action output', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      let emitted = false;
      component.action.subscribe(() => {
        emitted = true;
      });

      component.onAction();

      expect(emitted).toBe(true);
    });

    it('should clear auto-dismiss timeout', (done) => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 100);
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      let closedEmitCount = 0;
      component.closed.subscribe(() => {
        closedEmitCount++;
      });

      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();

      setTimeout(() => {
        component.onAction();

        setTimeout(() => {
          expect(closedEmitCount).toBe(0);
          done();
        }, 100);
      }, 50);
    });

    it('should emit without arguments', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      spyOn(component.action, 'emit');

      component.onAction();

      expect(component.action.emit).toHaveBeenCalledWith();
    });
  });

  describe('DOM rendering', () => {
    it('should render notification element', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.notification');

      expect(notification).toBeTruthy();
    });

    it('should have show class when show is true', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.notification');

      expect(notification.classList.contains('notification--show')).toBe(true);
    });

    it('should not have show class when show is false', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.notification');

      expect(notification.classList.contains('notification--show')).toBe(false);
    });

    it('should have success class by default', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.notification');

      expect(notification.classList.contains('notification--success')).toBe(true);
      expect(notification.classList.contains('notification--error')).toBe(false);
    });

    it('should have error class when type is error', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('type', 'error');
      fixture.detectChanges();

      const notification = fixture.nativeElement.querySelector('.notification');

      expect(notification.classList.contains('notification--error')).toBe(true);
      expect(notification.classList.contains('notification--success')).toBe(false);
    });

    it('should display message text', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Success message');
      fixture.detectChanges();

      const message = fixture.nativeElement.querySelector('.notification__message');

      expect(message.textContent.trim()).toBe('Success message');
    });

    it('should not render action button when actionText is empty', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const actionButton = fixture.nativeElement.querySelector('.notification__action');

      expect(actionButton).toBeNull();
    });

    it('should render action button when actionText is provided', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      const actionButton = fixture.nativeElement.querySelector('.notification__action');

      expect(actionButton).toBeTruthy();
      expect(actionButton.textContent.trim()).toBe('Retry');
    });

    it('should render close button', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const closeButton = fixture.nativeElement.querySelector('.notification__close');

      expect(closeButton).toBeTruthy();
      expect(closeButton.getAttribute('aria-label')).toBe('Close notification');
    });

    it('should set tabindex 0 on action button when show is true', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      const actionButton = fixture.nativeElement.querySelector('.notification__action');

      expect(actionButton.getAttribute('tabindex')).toBe('0');
    });

    it('should set tabindex -1 on action button when show is false', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      const actionButton = fixture.nativeElement.querySelector('.notification__action');

      expect(actionButton.getAttribute('tabindex')).toBe('-1');
    });

    it('should set tabindex 0 on close button when show is true', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const closeButton = fixture.nativeElement.querySelector('.notification__close');

      expect(closeButton.getAttribute('tabindex')).toBe('0');
    });

    it('should set tabindex -1 on close button when show is false', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const closeButton = fixture.nativeElement.querySelector('.notification__close');

      expect(closeButton.getAttribute('tabindex')).toBe('-1');
    });

    it('should render progress bar', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('.notification__progress-bar');

      expect(progressBar).toBeTruthy();
    });

    it('should set animation duration on progress bar', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 3000);
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('.notification__progress-bar');

      expect(progressBar.style.animationDuration).toBe('3000ms');
    });

    it('should have success class on progress bar by default', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('.notification__progress-bar');

      expect(progressBar.classList.contains('notification__progress-bar--success')).toBe(true);
      expect(progressBar.classList.contains('notification__progress-bar--error')).toBe(false);
    });

    it('should have error class on progress bar when type is error', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('type', 'error');
      fixture.detectChanges();

      const progressBar = fixture.nativeElement.querySelector('.notification__progress-bar');

      expect(progressBar.classList.contains('notification__progress-bar--error')).toBe(true);
      expect(progressBar.classList.contains('notification__progress-bar--success')).toBe(false);
    });
  });

  describe('Click interactions', () => {
    it('should call onClose when close button is clicked', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      spyOn(component, 'onClose');

      const closeButton = fixture.nativeElement.querySelector('.notification__close');
      closeButton.click();

      expect(component.onClose).toHaveBeenCalled();
    });

    it('should emit closed when close button is clicked', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      let emitted = false;
      component.closed.subscribe(() => {
        emitted = true;
      });

      const closeButton = fixture.nativeElement.querySelector('.notification__close');
      closeButton.click();

      expect(emitted).toBe(true);
    });

    it('should call onAction when action button is clicked', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      spyOn(component, 'onAction');

      const actionButton = fixture.nativeElement.querySelector('.notification__action');
      actionButton.click();

      expect(component.onAction).toHaveBeenCalled();
    });

    it('should emit action when action button is clicked', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      let emitted = false;
      component.action.subscribe(() => {
        emitted = true;
      });

      const actionButton = fixture.nativeElement.querySelector('.notification__action');
      actionButton.click();

      expect(emitted).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty message', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', '');
      fixture.detectChanges();

      const message = fixture.nativeElement.querySelector('.notification__message');

      expect(message.textContent.trim()).toBe('');
    });

    it('should handle very long message', () => {
      const longMessage = 'A'.repeat(200);
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', longMessage);
      fixture.detectChanges();

      const message = fixture.nativeElement.querySelector('.notification__message');

      expect(message.textContent.trim()).toBe(longMessage);
    });

    it('should handle zero duration', (done) => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('duration', 0);
      fixture.detectChanges();

      component.closed.subscribe(() => {
        done();
      });

      fixture.componentRef.setInput('show', true);
      fixture.detectChanges();
    });

    it('should handle multiple close clicks', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.detectChanges();

      let emitCount = 0;
      component.closed.subscribe(() => {
        emitCount++;
      });

      const closeButton = fixture.nativeElement.querySelector('.notification__close');
      closeButton.click();
      closeButton.click();
      closeButton.click();

      expect(emitCount).toBe(3);
    });

    it('should handle multiple action clicks', () => {
      fixture.componentRef.setInput('show', true);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('actionText', 'Retry');
      fixture.detectChanges();

      let emitCount = 0;
      component.action.subscribe(() => {
        emitCount++;
      });

      const actionButton = fixture.nativeElement.querySelector('.notification__action');
      actionButton.click();
      actionButton.click();

      expect(emitCount).toBe(2);
    });

    it('should update classes when type changes', () => {
      fixture.componentRef.setInput('show', false);
      fixture.componentRef.setInput('message', 'Test');
      fixture.componentRef.setInput('type', 'success');
      fixture.detectChanges();

      let notification = fixture.nativeElement.querySelector('.notification');
      expect(notification.classList.contains('notification--success')).toBe(true);

      fixture.componentRef.setInput('type', 'error');
      fixture.detectChanges();

      notification = fixture.nativeElement.querySelector('.notification');
      expect(notification.classList.contains('notification--error')).toBe(true);
      expect(notification.classList.contains('notification--success')).toBe(false);
    });
  });
});
