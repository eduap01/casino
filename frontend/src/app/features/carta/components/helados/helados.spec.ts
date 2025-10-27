import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Helados } from './helados';

describe('Helados', () => {
  let component: Helados;
  let fixture: ComponentFixture<Helados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Helados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Helados);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
