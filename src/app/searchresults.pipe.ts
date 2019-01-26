import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchresults'
})
export class SearchresultsPipe implements PipeTransform {

  transform(data: any[], searchingTerm: any): any {
    if(!data || !searchingTerm)
    {
      return data;
    }
    else{
      return data.filter(x=>x.sname.toLowerCase().indexOf(searchingTerm.toLowerCase())!==-1);
    }
  }

}
