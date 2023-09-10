import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorrentTableContainerComponent } from './torrent-table-container.component';

describe('TorrentTableContainerComponent', () => {
  let component: TorrentTableContainerComponent;
  let fixture: ComponentFixture<TorrentTableContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TorrentTableContainerComponent]
    });
    fixture = TestBed.createComponent(TorrentTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
