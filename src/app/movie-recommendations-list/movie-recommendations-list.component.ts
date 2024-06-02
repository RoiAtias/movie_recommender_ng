import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MovieDialogDetailsComponent } from '../movie-dialog-details/movie-dialog-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-recommendations-list',
  templateUrl: './movie-recommendations-list.component.html',
  styleUrls: ['./movie-recommendations-list.component.css']
})
export class MovieRecommendationsListComponent {
  data: any;
  posterBaseAddress!:"https://image.tmdb.org/t/p/original";
  
  constructor(private router: Router, private dialog:MatDialog) {
    const navigation = this.router.getCurrentNavigation();
    this.data = navigation?.extras;
  }

  OnMatCardClickEvent(item:any){
    let dialogRef = this.dialog.open(MovieDialogDetailsComponent, {
      width: '95%',   
      height: '95%', 
      data: {
        item : item
      }
    });
    dialogRef.componentInstance.item = item;
  }
}
