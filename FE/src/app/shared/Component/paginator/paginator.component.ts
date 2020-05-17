import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {

  @Input() currentPage = 1;
  @Input() availableProductCount = 0;
  @Output() itemsPerPageEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageNumberEmitter: EventEmitter<number> = new EventEmitter<number>();
  itemsPerPage = '10';
  availablePagesList: string[] = [];
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.availableProductCount) {
      this.availablePagesList = [];
      for (let i = 1; i <= (this.availableProductCount / parseInt(this.itemsPerPage)) + 1; i++) {
        this.availablePagesList.push(i.toString());
      }
    }
  }
  emitItemsPerPage() {
    this.itemsPerPageEmitter.emit(parseInt(this.itemsPerPage));
    this.availablePagesList = [];
    for (let i = 1; i <= (this.availableProductCount / parseInt(this.itemsPerPage)) + 1; i++) {
        this.availablePagesList.push(i.toString());
    }
  }

  emitPageNumber() {
    this.pageNumberEmitter.emit(this.currentPage);
  }

  firstPage() {
    this.currentPage = 1;
    this.emitPageNumber();
  }

  beforePage() {
    if (this.currentPage === 1) {
      this.emitPageNumber();
    } else {
      this.currentPage--;
      this.emitPageNumber();
    }
  }

  nextPage() {
    if (this.currentPage == parseInt(this.availablePagesList[this.availablePagesList.length - 1])) {
      this.emitPageNumber();
    } else {
      this.currentPage++;
      this.emitPageNumber();
    }
  }

  lastPage() {
    this.currentPage = parseInt(this.availablePagesList[this.availablePagesList.length - 1]);
    this.emitPageNumber();
  }
}
