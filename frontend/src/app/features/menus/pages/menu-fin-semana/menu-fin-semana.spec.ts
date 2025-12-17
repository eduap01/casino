import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFinSemana } from './menu-fin-semana';

describe('MenuFinSemana', () => {
  let component: MenuFinSemana;
  let fixture: ComponentFixture<MenuFinSemana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFinSemana]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFinSemana);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
