import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollArrowComponent } from './scroll-arrow.component';

describe('ScrollArrowComponent', () => {
  let component: ScrollArrowComponent;
  let fixture: ComponentFixture<ScrollArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollArrowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
