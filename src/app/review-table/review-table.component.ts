import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-review-table',
  templateUrl: './review-table.component.html',
  styleUrls: ['./review-table.component.css']
})

export class ReviewTableComponent implements OnInit ,AfterViewInit, OnChanges {

  @Input() items: Movie[] = [];
  @Input() isLoading!: boolean;
  displayedColumns: string[] = ['title','author', 'content', 'date','rating','sentiment','liked','Review_Length'];
  @ViewChild('paginator', { static: true }) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Movie>([]);
  totalRecords = 0;
  pageSize: number = 5;
  pageIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.items = changes['items'].currentValue;
      this.dataSource = new MatTableDataSource<Movie>(this.items);
      this.dataSource.paginator = this.paginator;
      this.totalRecords = this.items?.length;
    }
    if (changes['isLoading']) {
      this.isLoading = changes['isLoading'].currentValue;
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Movie>(this.items);
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.totalRecords = this.items?.length;
  }
}

export interface Movie {
  author: string;
  content: string;
  date: string ;
  rating: string;
  sentiment: string;
  title: string;
}
