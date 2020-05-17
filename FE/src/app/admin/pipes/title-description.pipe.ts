import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitleDescription'
})
export class TitleDescriptionPipe implements PipeTransform {

  transform(title: string, description: string, size: number= 45): string {
    let titleDescription = '';
    if (description.length !== 0) {
      titleDescription = title + ': ' + description;
    } else {
      titleDescription = title;
    }
    if (titleDescription.length < size) {
      return titleDescription;
    }
    return titleDescription.substring(0, size) + ' ...';
  }

}
