import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAdminComponent } from './video-admin.component';

describe('VideoAdminComponent', () => {
  let component: VideoAdminComponent;
  let fixture: ComponentFixture<VideoAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoAdminComponent]
    });
    fixture = TestBed.createComponent(VideoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
