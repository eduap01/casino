import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Postres } from './postres';

describe('Postres', () => {
  let component: Postres;
  let fixture: ComponentFixture<Postres>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Postres]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Postres);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
