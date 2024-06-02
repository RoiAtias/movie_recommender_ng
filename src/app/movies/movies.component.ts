import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, combineLatest, debounceTime, distinctUntilChanged, exhaustMap, filter, map, of, scan, startWith, switchMap, tap } from 'rxjs';
import { MovieService } from '../movie.service';
import { TmdbService } from '../tmdb.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  isLoading: boolean = false;
  genres!: Genre[];
  selectedGenre!: number[];
  years: number[] = [];
  selectedYear!: number;
  filteredActors: any[] = [];
  actorSearchControl = new FormControl();
  selectedIndex: number = 0;
  selectedActors: string[] = [];
  userControl = new FormControl();

  constructor(private movieService: MovieService,private tmdbService : TmdbService, private router: Router) {
  }
  
  ngOnInit(): void {
    this.get_genre_ids();
    this.get_years();

    this.actorSearchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap((value: string) => this.tmdbService.search_person(value))
    ).subscribe((actors: any) => {
      this.filteredActors = actors.results;
    });
  }
  
  selectTab(index: number) {
    this.selectedIndex = index;
  }

  get_years() {
    const startYear = 1990;
    const currentYear = new Date().getFullYear();
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
    this.selectedYear = currentYear;
  }

  get_genre_ids() {
     this.tmdbService.get_genre_ids().subscribe(res => {
      this.genres = res.genres;
     })
  };

  search(selectedIndex:number) {
    this.isLoading = true;
    if(selectedIndex == 0){
    this.movieService.searchSimilarMovies().subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/movie-recommendations-list'], res.movies);
      ;
    });
  } else {
    this.tmdbService.discover_movie(this.selectedGenre,this.selectedYear,this.selectedActors).subscribe(res => {
      this.isLoading = false;
      this.router.navigate(['/movie-recommendations-list'], res.results);
      ;
    });
  }
  }

  selectActor(event: any): void {
    this.selectedActors.push(event);
  }

  displayFn(actor: any): string {
    return actor && actor.name ? actor.name : '';
  }

  optionClicked(event: Event, actor: any) {
    event.stopPropagation();
  }

  toggleSelection(actor: any, isChecked: boolean) {
    if (isChecked) {
      this.selectedActors.push(actor.id);
    } else {
      const i = this.selectedActors.findIndex(value => value === actor.id);
      this.selectedActors.splice(i, 1);
    }
  }
}

export interface Genre {
  id: number;
  name: string;
}
