import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestraHistoriaPage } from './nuestra-historia-page';

describe('NuestraHistoriaPage', () => {
  let component: NuestraHistoriaPage;
  let fixture: ComponentFixture<NuestraHistoriaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestraHistoriaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestraHistoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
