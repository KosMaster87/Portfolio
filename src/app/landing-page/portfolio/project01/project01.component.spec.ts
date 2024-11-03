import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project01Component } from './project01.component';

describe('Project01Component', () => {
  let component: Project01Component;
  let fixture: ComponentFixture<Project01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Project01Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Project01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
