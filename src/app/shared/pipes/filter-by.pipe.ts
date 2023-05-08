import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  transform(
    items: any[],
    filterValue: string,
    ...filterProperties: string[]
  ): any[] {
    if (!items || !filterProperties.length || !filterValue) {
      return items;
    }

    const filteredResult = items.filter((item) => {
      const props = Object.keys(item);

      return filterProperties.some((prop) => {
        if (!props.includes(prop)) {
          return false;
        }

        const value = item[prop];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(filterValue.toLowerCase());
        }

        return false;
      });
    });
    
    return filteredResult;
  }
}
