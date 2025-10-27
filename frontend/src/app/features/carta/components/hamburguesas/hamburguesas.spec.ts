import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hamburguesas } from './hamburguesas';

describe('Hamburguesas', () => {
  let component: Hamburguesas;
  let fixture: ComponentFixture<Hamburguesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hamburguesas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hamburguesas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
