import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoedaValorComponent } from './moeda-valor.component';

describe('MoedaValorComponent', () => {
  let component: MoedaValorComponent;
  let fixture: ComponentFixture<MoedaValorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoedaValorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoedaValorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
