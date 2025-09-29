import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosMensais } from './gastos-mensais';

describe('GastosMensais', () => {
  let component: GastosMensais;
  let fixture: ComponentFixture<GastosMensais>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastosMensais]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosMensais);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
