import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { FooterComponent } from 'src/app/components/shared/footer/footer.component';
import { TopTorrentCardComponent } from 'src/app/components/top-torrent-card/top-torrent-card.component';
import { TopTorrentTitleComponent } from 'src/app/components/top-torrent-title/top-torrent-title.component';

@NgModule({
  declarations: [
    HomePageComponent,

    TopTorrentTitleComponent,
    TopTorrentCardComponent,
  ],
  imports: [CommonModule],
})
export class HomePageModule {}
