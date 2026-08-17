import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let fixture: ComponentFixture<NotificationComponent>;
  let component: NotificationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('show', false);
    fixture.componentRef.setInput('message', 'Hello');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render the message', () => {
    fixture.detectChanges();
    const message: HTMLElement = fixture.nativeElement.querySelector(
      '.dev2k-notification__message',
    );
    expect(message.textContent).toContain('Hello');
  });

  it('should not render an action button without actionText', () => {
    fixture.detectChanges();
    const action = fixture.nativeElement.querySelector('.dev2k-notification__action');
    expect(action).toBeNull();
  });

  it('should render an action button with actionText and emit on click', () => {
    fixture.componentRef.setInput('actionText', 'Update');
    fixture.detectChanges();

    const action: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.dev2k-notification__action',
    );
    expect(action.textContent).toContain('Update');

    const actionSpy = jasmine.createSpy('action');
    component.action.subscribe(actionSpy);
    action.click();
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should emit closed on close button click', () => {
    fixture.detectChanges();
    const closedSpy = jasmine.createSpy('closed');
    component.closed.subscribe(closedSpy);

    const closeBtn: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.dev2k-notification__close',
    );
    closeBtn.click();

    expect(closedSpy).toHaveBeenCalled();
  });

  it('should auto-dismiss after duration when not persistent', (done) => {
    fixture.componentRef.setInput('duration', 10);
    fixture.componentRef.setInput('persist', false);
    const closedSpy = jasmine.createSpy('closed');
    component.closed.subscribe(closedSpy);

    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();

    setTimeout(() => {
      expect(closedSpy).toHaveBeenCalled();
      done();
    }, 30);
  });

  it('should not auto-dismiss when persistent', (done) => {
    fixture.componentRef.setInput('duration', 10);
    fixture.componentRef.setInput('persist', true);
    const closedSpy = jasmine.createSpy('closed');
    component.closed.subscribe(closedSpy);

    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();

    setTimeout(() => {
      expect(closedSpy).not.toHaveBeenCalled();
      done();
    }, 30);
  });

  it('should not render the progress bar when persistent', () => {
    fixture.componentRef.setInput('persist', true);
    fixture.componentRef.setInput('show', true);
    fixture.detectChanges();

    const progressBar = fixture.nativeElement.querySelector('.dev2k-notification__progress-bar');
    expect(progressBar).toBeNull();
  });
});
