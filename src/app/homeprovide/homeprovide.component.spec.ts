import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeprovideComponent } from './homeprovide.component';

describe('HomeprovideComponent', () => {
  let component: HomeprovideComponent;
  let fixture: ComponentFixture<HomeprovideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeprovideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeprovideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
