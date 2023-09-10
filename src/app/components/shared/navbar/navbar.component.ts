import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  OperatorFunction,
  Observable,
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  merge,
  filter,
} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {


  constructor(private router:Router) {}

  ngOnInit(): void {
    let localStorageSuggestions = localStorage.getItem('_suggestions');
    if (localStorageSuggestions) {
      let suggestionsArray = JSON.parse(localStorageSuggestions);
      this.suggestions = suggestionsArray;
    } else if (!localStorage.getItem('_suggestions')) {
      localStorage.setItem('_suggestions', JSON.stringify(this.suggestions) );
    }


  }
  suggestions: string[] = [];
  inputTerm: string = '';

  @ViewChild('instance', { static: true }) instance: NgbTypeahead =
    {} as NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  searchTypeHead: OperatorFunction<string, readonly string[]> = (
    text$: Observable<string>
  ) => {
    const debouncedText$ = text$.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );
    const clicksWithClosedPopup$ = this.click$.pipe(
      filter(() => !this.instance.isPopupOpen())
    );
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map((term) =>
        (term === ''
          ? this.suggestions
          : this.suggestions.filter(
              (v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
        ).slice(0, 5)
      )
    );
  };

 // Remove the state from the list of suggestions
 deleteState(state: string) {
    let index = this.suggestions.indexOf(state);
    if (index > -1) {
      this.suggestions = this.suggestions.filter((v) => v !== state);
    }
    // prevent closing dropdown when clicked
    event!.stopPropagation();

    // If the user has already typed something, reopen the dropdown
    // with the user's current input as the search term
    let tempSearchTerm = this.inputTerm;
    this.instance.dismissPopup();
    this.click$.next(tempSearchTerm);
  }


  submitSearchTerm() {

    this.inputTerm = this.inputTerm.trim();

    if (this.inputTerm.length > 0) {
      if (this.suggestions.indexOf(this.inputTerm) === -1) {
        this.suggestions = [this.inputTerm, ...this.suggestions];
        localStorage.setItem('_suggestions', JSON.stringify(this.suggestions));
      }
    }

    this.router.navigate(['/torrents/anime/'+this.inputTerm]);



  }

  openDropDown() {
   if (this.suggestions.length > 0) {
    this.click$.next(this.inputTerm);
   }
  }
}


