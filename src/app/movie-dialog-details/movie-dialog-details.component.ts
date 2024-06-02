import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-dialog-details',
  templateUrl: './movie-dialog-details.component.html',
  styleUrls: ['./movie-dialog-details.component.css']
})
export class MovieDialogDetailsComponent implements OnInit {
  @Input() item:any;

  public itemName!: string;
  public itemImageUrl!: string;
  reviews! : any;
  extended_review_data: any
  isLoadingReviewTable:boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private movieService: MovieService) { }
  
  ngOnInit() {
    this.movieService.getReviews(this.item.title).subscribe(res=>{
      this.isLoadingReviewTable = false;
      this.reviews = res.reviews;
      this.extended_review_data = res.extended;
    }, 
    error => this.isLoadingReviewTable = false);
  }
}
