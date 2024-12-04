import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToFragmentOptionalComponent } from './scroll-to-fragment-optional.component';

describe('ScrollToFragmentOptionalComponent', () => {
  let component: ScrollToFragmentOptionalComponent;
  let fixture: ComponentFixture<ScrollToFragmentOptionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollToFragmentOptionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollToFragmentOptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
