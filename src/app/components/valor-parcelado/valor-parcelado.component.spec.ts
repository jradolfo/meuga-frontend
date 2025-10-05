import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorParceladoComponent } from './valor-parcelado.component';

describe('ValorParceladoComponent', () => {
  let component: ValorParceladoComponent;
  let fixture: ComponentFixture<ValorParceladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorParceladoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorParceladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
