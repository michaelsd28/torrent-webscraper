import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';


let homePageRoute:Route = {
  path: '',
  loadChildren: () => import('./modules/home-page/home-page.module').then(module => module.HomePageModule),
  component: HomePageComponent

}
let torrentPageRoute:Route = {
  path: 'torrents?search=:search?page=:page',
  loadChildren: () => import('./modules/torrent-scrape/torrent-scrape.module').then(module => module.TorrentScrapeModule)
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
