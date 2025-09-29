import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Batidos } from './batidos';

describe('Batidos', () => {
  let component: Batidos;
  let fixture: ComponentFixture<Batidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Batidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Batidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
