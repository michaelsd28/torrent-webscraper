import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TorrentTableComponent } from 'src/app/components/torrent-table/torrent-table.component';
import { TorrentTableContainerComponent } from 'src/app/components/torrent-table-container/torrent-table-container.component';

import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    TorrentTableComponent,
    TorrentTableContainerComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule

  ]
})
export class TorrentScrapeModule { }
