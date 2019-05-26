import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../clases/student';

@Pipe({
  name: 'filter'
})
export class SearchTextPipe implements PipeTransform {

  transform(student: Student[], searchText: string): any {
    if (!student) {return []; }
    if (!searchText) {return student; }
    searchText = searchText.toLocaleLowerCase();
    return student.filter(data => {
      return data.fullName.toLocaleLowerCase().includes(searchText);
    });
   }
}
