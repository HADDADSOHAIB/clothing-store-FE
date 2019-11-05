import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  @Input() currentPage:number=1;
  @Input() availableProductCount:number;
  @Output() itemsPerPageEmitter:EventEmitter<number>=new EventEmitter<number>();
  @Output() pageNumberEmitter:EventEmitter<number>=new EventEmitter<number>();
  itemsPerPage:string="10";
  availablePagesList:string[]=[];
  constructor() { }

  ngOnInit() {
    for(let i=1;i<(this.availableProductCount/parseInt(this.itemsPerPage))+1;i++)
      this.availablePagesList.push(i.toString());
  }

  emitItemsPerPage(){
    this.itemsPerPageEmitter.emit(parseInt(this.itemsPerPage));
  }

  emitPageNumber(){
    this.pageNumberEmitter.emit(this.currentPage);
  }

  firstPage(){
    this.currentPage=1;
    this.emitPageNumber();
  }

  beforePage(){
    this.currentPage--;
    this.emitPageNumber();
  }

  nextPage(){
    this.currentPage++;
    this.emitPageNumber();
  }

  lastPage(){
    this.currentPage=parseInt(this.availablePagesList[this.availablePagesList.length-1]);
    this.emitPageNumber();
  }
}