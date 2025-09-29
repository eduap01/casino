import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ensaladas } from './ensaladas';

describe('Ensaladas', () => {
  let component: Ensaladas;
  let fixture: ComponentFixture<Ensaladas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ensaladas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ensaladas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
