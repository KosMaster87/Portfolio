import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToFragmentComponent } from './scroll-to-fragment.component';

describe('ScrollToFragmentComponent', () => {
  let component: ScrollToFragmentComponent;
  let fixture: ComponentFixture<ScrollToFragmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollToFragmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollToFragmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
