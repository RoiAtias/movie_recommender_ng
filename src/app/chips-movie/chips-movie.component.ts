import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { TmdbService } from '../tmdb.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-chips-movie',
  templateUrl: './chips-movie.component.html',
  styleUrls: ['./chips-movie.component.css']
})
export class ChipsMovieComponent {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  movieCtrl = new FormControl('');
  filteredmovies: Observable<any[]>;
  movies: string[] = [];

  @ViewChild('movieInput') movieInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  constructor(private tmdbService:TmdbService,private movieService : MovieService) {
    this.filteredmovies = this.movieCtrl.valueChanges.pipe(
      startWith(null),
      switchMap((value) => this._filter(value || '')),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.movies.push(value);
    }

    event.chipInput!.clear();

    this.movieCtrl.setValue(null);
  }

  remove(movie: string): void {
    const index = this.movies.indexOf(movie);

    if (index >= 0) {
      this.movies.splice(index, 1);

      this.announcer.announce(`Removed ${movie}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.movies.push(event.option.viewValue);
    this.movieInput.nativeElement.value = '';
    this.movieCtrl.setValue(null);
    this.movieService.selectedMovies = this.movies;
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  private _filter(value: string): Observable<any[]> {
      return this.tmdbService.search(value).pipe(
        map(response => response.results)
      );

    // return this.allmovies.filter(movie => movie.toLowerCase().includes(filterValue));
  }
}
