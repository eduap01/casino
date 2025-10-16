import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaEventoPage } from './reserva-evento-page';

describe('ReservaEventoPage', () => {
  let component: ReservaEventoPage;
  let fixture: ComponentFixture<ReservaEventoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaEventoPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
