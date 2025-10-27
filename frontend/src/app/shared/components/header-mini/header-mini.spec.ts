import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderMini } from './header-mini';

describe('HeaderMini', () => {
  let component: HeaderMini;
  let fixture: ComponentFixture<HeaderMini>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderMini]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderMini);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
