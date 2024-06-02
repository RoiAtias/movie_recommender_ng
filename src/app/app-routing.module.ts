import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieRecommendationsListComponent } from './movie-recommendations-list/movie-recommendations-list.component';

const routes: Routes = [
  { path: '', component: MoviesComponent },
  { path: 'movie-recommendations-list', component: MovieRecommendationsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
