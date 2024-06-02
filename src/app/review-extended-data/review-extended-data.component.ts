import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-extended-data',
  templateUrl: './review-extended-data.component.html',
  styleUrls: ['./review-extended-data.component.css']
})
export class ReviewExtendedDataComponent implements OnInit,OnChanges  {

  @Input() items!: ExtendedModelItem; 
  @Input() isLoading!: boolean;
  word_cloud_url_positive: any;
  word_cloud_url_neutral: any;
  word_cloud_url_negative: any;
  positive_common_words_sorted : any
  neutral_common_words_sorted : any
  negative_common_words_sorted: any

  test: any

  constructor(private sanitizer: DomSanitizer) {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.items = changes['items'].currentValue;
      if (this.items?.positive_reviews_image != null) {
      const positive_url = `data:image/png;base64,${this.items.positive_reviews_image}`;
      this.word_cloud_url_positive = this.sanitizer.bypassSecurityTrustUrl(positive_url);
      }
      if (this.items?.neutral_reviews_image != null) {
      const neutral_url = `data:image/png;base64,${this.items.neutral_reviews_image}`;
      this.word_cloud_url_neutral = this.sanitizer.bypassSecurityTrustUrl(neutral_url);
      }
      if (this.items?.negative_reviews_image != null) {
      const negative_url = `data:image/png;base64,${this.items.negative_reviews_image}`;
      this.word_cloud_url_negative = this.sanitizer.bypassSecurityTrustUrl(negative_url);
      }
      if(this.items?.neutral_common_words!= null){
        const entries = Object.entries(this.items.neutral_common_words);
        this.neutral_common_words_sorted = entries.sort((a, b) => b[1] - a[1]);
      }
      if(this.items?.negative_common_words!= null){
        const entries = Object.entries(this.items.negative_common_words);
        this.negative_common_words_sorted = entries.sort((a, b) => b[1] - a[1]);
      }
      if(this.items?.positive_common_words!= null){
        const entries = Object.entries(this.items.positive_common_words);
        this.positive_common_words_sorted = entries.sort((a, b) => b[1] - a[1]);
      }
    }
    if (changes['isLoading']) {
      this.isLoading = changes['isLoading'].currentValue;
    }
  }
  
  ngOnInit(): void {
  }

}

export interface ExtendedModelItem {
  positive_reviews_length: number;
  neutral_reviews_length: number;
  negative_reviews_length: number;
  positive_reviews_image: string;
  neutral_reviews_image: string;
  negative_reviews_image: string;
  positive_common_words: { [word: string]: number };
  neutral_common_words: { [word: string]: number };
  negative_common_words: { [word: string]: number };
}
