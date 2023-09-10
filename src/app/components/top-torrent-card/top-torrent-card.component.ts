import { Component, Input } from '@angular/core';
import { ITorrentCard } from 'src/app/interfaces/torrent-card';

@Component({
  selector: 'app-top-torrent-card',
  templateUrl: './top-torrent-card.component.html',
  styleUrls: ['./top-torrent-card.component.css']
})
export class TopTorrentCardComponent {

  @Input() torrents: ITorrentCard[]= [];

}
