import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeroDetailComponent } from './hero-detail.component';

describe('GeroDetailComponent', () => {
  let component: GeroDetailComponent;
  let fixture: ComponentFixture<GeroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeroDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
