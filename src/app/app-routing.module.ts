import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TorrentTableComponent } from './components/torrent-table/torrent-table.component';
import { TorrentTableContainerComponent } from './components/torrent-table-container/torrent-table-container.component';


let homePageRoute:Route = {
  path: '',
  loadChildren: () => import('./modules/home-page/home-page.module').then(module => module.HomePageModule),
  component: HomePageComponent

}
let torrentPageRoute:Route = {
  path: 'torrents/:category/:search',
  loadChildren: () => import('./modules/torrent-scrape/torrent-scrape.module').then(module => module.TorrentScrapeModule),
  component: TorrentTableContainerComponent
}

const routes: Routes = [
  homePageRoute,
  torrentPageRoute
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
