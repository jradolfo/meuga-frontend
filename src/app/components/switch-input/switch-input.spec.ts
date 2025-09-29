import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchInput } from './switch-input';

describe('SwitchInput', () => {
  let component: SwitchInput;
  let fixture: ComponentFixture<SwitchInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
