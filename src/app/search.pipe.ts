import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchTerm:String): any {
    if(!data || !searchTerm)
    {
      return data;
    }
    else{
      return data.filter(x=>x.notification.toLowerCase().indexOf(searchTerm.toLowerCase())!==-1);
    }
  }

}
