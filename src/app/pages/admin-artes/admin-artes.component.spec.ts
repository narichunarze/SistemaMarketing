import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArtesComponent } from './admin-artes.component';

describe('AdminArtesComponent', () => {
  let component: AdminArtesComponent;
  let fixture: ComponentFixture<AdminArtesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminArtesComponent]
    });
    fixture = TestBed.createComponent(AdminArtesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
