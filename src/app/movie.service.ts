import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  selectedMovies!:string[];

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://127.0.0.1:5000/api/movies';

  getData(searchName: string, pageNumber: string,pageSize:string): Observable<any> {
    let params = new HttpParams().set('searchName', searchName).set('pageNumber', pageNumber).set('pageSize', pageSize);
    return this.http.get<any>(this.apiUrl, { params });
  }

  searchSimilarMovies(): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/' + 'searchSimilarMovies', { data: this.selectedMovies });
  }

  getReviews(movieTitle: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/' + 'reviews', { data: movieTitle });
  }

}