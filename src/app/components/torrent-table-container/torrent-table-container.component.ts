import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-torrent-table-container',
  templateUrl: './torrent-table-container.component.html',
  styleUrls: ['./torrent-table-container.component.css']
})
export class TorrentTableContainerComponent implements OnInit {

  category: string = '';
  searchTerm: string = '';

  constructor(private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
   // get the route params
   this.activatedRoute.params.subscribe(params => {
    // set the category
    this.category = params['category'];
    // set the search term
    this.searchTerm = params['search'];

    });
  }

}
