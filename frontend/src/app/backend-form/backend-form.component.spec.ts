import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendFormComponent } from './backend-form.component';

describe('BackendFormComponent', () => {
  let component: BackendFormComponent;
  let fixture: ComponentFixture<BackendFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
