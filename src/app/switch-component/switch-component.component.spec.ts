import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchComponentComponent } from './switch-component.component';

describe('SwitchComponentComponent', () => {
  let component: SwitchComponentComponent;
  let fixture: ComponentFixture<SwitchComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
