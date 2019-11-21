import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitleDescription'
})
export class TitleDescriptionPipe implements PipeTransform {

  transform(title:string, description:string, size:number=50): string {
    if(description.length!==0){
      var titleDescription=title+": "+description;
    } else{
      var titleDescription=title;
    }
    if(titleDescription.length<size)
      return titleDescription;
    return titleDescription.substring(0,size)+" ...";
  }

}
