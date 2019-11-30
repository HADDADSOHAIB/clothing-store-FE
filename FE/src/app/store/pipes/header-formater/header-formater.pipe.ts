import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'headerFormater'
})
export class HeaderFormaterPipe implements PipeTransform {

  transform(title:string,size:number=18): string {
    if(title.length<size)
      return title;
    return title.substring(0,size)+" ...";
  }

}
