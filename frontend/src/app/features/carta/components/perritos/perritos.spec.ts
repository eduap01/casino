import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Perritos } from './perritos';

describe('Perritos', () => {
  let component: Perritos;
  let fixture: ComponentFixture<Perritos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perritos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perritos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
