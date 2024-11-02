import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPodcastComponent } from './admin-podcast.component';

describe('AdminPodcastComponent', () => {
  let component: AdminPodcastComponent;
  let fixture: ComponentFixture<AdminPodcastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPodcastComponent]
    });
    fixture = TestBed.createComponent(AdminPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
