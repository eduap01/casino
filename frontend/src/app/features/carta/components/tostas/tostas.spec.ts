import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tostas } from './tostas';

describe('Tostas', () => {
  let component: Tostas;
  let fixture: ComponentFixture<Tostas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tostas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tostas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
