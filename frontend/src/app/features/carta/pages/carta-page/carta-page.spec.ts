import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaPage } from './carta-page';

describe('CartaPage', () => {
  let component: CartaPage;
  let fixture: ComponentFixture<CartaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
