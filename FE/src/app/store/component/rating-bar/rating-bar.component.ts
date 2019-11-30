import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent implements OnInit {
  @Input() rating:number=4;
  @Input() readOnly:boolean=false;
  @Output() ratingChange:EventEmitter<number>=new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeRating(rating:string){
    if(!this.readOnly){
      this.rating=parseInt(rating);
      this.ratingChange.emit(this.rating);
    }
  }
}

