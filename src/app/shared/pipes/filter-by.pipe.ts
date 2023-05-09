import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  /* Here is the explanation for the code above:
    1. We are checking if we have items, filterProperties and filterValue.
    2. Then we are filtering the items array based on the filterProperties.
    3. We are using some method instead of forEach or map because we want to stop the iteration when we find a match. some method returns a boolean value. If the return value is true, the iteration will stop. If the return value is false, the iteration will continue.
    4. We are using includes method to check if the item has the property we are looking for.
    5. Finally we are checking if the property is string and if it is we are using includes method to check if the value includes the filterValue. 
  */
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
