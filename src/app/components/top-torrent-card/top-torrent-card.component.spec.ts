import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTorrentCardComponent } from './top-torrent-card.component';

describe('TopTorrentCardComponent', () => {
  let component: TopTorrentCardComponent;
  let fixture: ComponentFixture<TopTorrentCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopTorrentCardComponent]
    });
    fixture = TestBed.createComponent(TopTorrentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
