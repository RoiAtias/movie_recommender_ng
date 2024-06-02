import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  TMDB_API_URL = 'https://api.themoviedb.org/3';
  TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDgzMmVmZjRmMjI2YTlhMjk5YmFkZWIzZDY1NmQ3ZSIsInN1YiI6IjY2MmFiOGFmZjkxODNhMDExZTMwYWI3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.baB6Pqy9C0LHLixzEchThZPm2ZejWHgvBDe2H4bZidQ";
  moviesPageNumber = 1;
  headers = new HttpHeaders({
    Authorization: 'Bearer ' + this.TMDB_TOKEN,
  });


  constructor(private http: HttpClient) { 
  }

  search(userSearchText: string): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/search/multi?query='${userSearchText}'&include_adult=false&language=en-US`,
      { headers: this.headers }
    );
  }

  search_person(userSearchText: string): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/search/person?query='${userSearchText}'&include_adult=false&language=en-US`,
      { headers: this.headers }
    );
  }

  get_genre_ids() : Observable<any>{
    return this.http.get<any>(
      `https://api.themoviedb.org/3/genre/movie/list?language=en-US`,
      { headers: this.headers }
    );
  }

  
  discover_movie(genres: number[],year: number,selectedActor: string[]): Observable<any> {
    var selected_genres = genres.join(',')
    var selected_actors = selectedActor.join(',')
    return this.http.get<any>(
      `https://api.themoviedb.org/3/discover/movie?with_cast=${selected_actors}&with_genres=${selected_genres}&year=${year}&include_adult=false&language=en-US`,
      { headers: this.headers }
    );
  }

}


