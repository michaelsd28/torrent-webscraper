import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTorrentTitleComponent } from './top-torrent-title.component';

describe('TopTorrentTitleComponent', () => {
  let component: TopTorrentTitleComponent;
  let fixture: ComponentFixture<TopTorrentTitleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopTorrentTitleComponent]
    });
    fixture = TestBed.createComponent(TopTorrentTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
