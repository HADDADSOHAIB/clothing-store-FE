import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit,OnChanges {
 
  @Input() rating:number=4;
  @Input() readOnly:boolean=false;
  @Output() ratingChange:EventEmitter<number>=new EventEmitter();
  ratingSelected:number;

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.rating){
     this.ratingSelected=this.rating; 
    }
  }
  

  changeRating(rating:string){
    if(!this.readOnly){
      this.ratingSelected=parseInt(rating);
    }
  }

  resetRating(){
    this.ratingSelected=this.rating;
  }

  commitChange(){
    this.rating=this.ratingSelected;
    this.ratingChange.emit(this.rating);
  }
}

