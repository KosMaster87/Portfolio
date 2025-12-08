import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecorativeBorderComponent } from './decorative-border.component';

describe('DecorativeBorderComponent', () => {
  let component: DecorativeBorderComponent;
  let fixture: ComponentFixture<DecorativeBorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorativeBorderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DecorativeBorderComponent);
    component = fixture.componentInstance();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
