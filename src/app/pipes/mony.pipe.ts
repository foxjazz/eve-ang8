import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'moneyPipe'})
export class moneyPipe implements PipeTransform {
  transform(value: number): string {

    let nn = 0;
    if(value === undefined)
      return '';
    let str = value.toString();
    if(str.indexOf('.') === -1)
      str += '.00';
    if(str.indexOf('.') === (str.length - 2))
      str += '0';
    if(str.indexOf('.') !== -1)
      nn = 3;

    if(str.length < 7)
      return str + ' (isk)';

    str = str.split('').reverse().join('');

    let apnd = '';
    let adj = 0;
    let l = str.length / 3 - 1;
    let i = 0;
    for(i = 0; i < l; i++)
    {
      if(str.length > (3 * i + 6)){
        apnd +=  str.substr(3 * i + adj, 3 + nn) + ',';
      }
      else{
        apnd +=  str.substr(3 * i + adj, 3 + nn) ;
      }
      nn = 0;
      adj = 3;
    }
    if(str.length > (3*i + 3))
    {
      let xi = str.length - (3 * i + 3);
      apnd +=  str.substr(3 * i + 3,xi);
    }

    return apnd.split('').reverse().join('') + ' (isk)';
    //return value.toString().replace(/(\d)(?=(\d{3})+\.)/g, '1,');
  }
}


@Pipe({name: 'mPipe'})
export class mPipe implements PipeTransform {
  transform(value: number): string {

    let nn = 0;
    if(value === undefined)
      return '';
    let str = value.toString();
    if(str.indexOf('.') === -1)
      str += '.00';
    if(str.indexOf('.') === (str.length - 2))
      str += '0';
    if(str.indexOf('.') !== -1)
      nn = 3;

    if(str.length < 7)
      return str ;

    str = str.split('').reverse().join('');

    let apnd = '';
    let adj = 0;
    let l = str.length / 3 - 1;
    let i = 0;
    for(i = 0; i < l; i++)
    {
      if(str.length > (3 * i + 6)){
        apnd +=  str.substr(3 * i + adj, 3 + nn) + ',';
      }
      else{
        apnd +=  str.substr(3 * i + adj, 3 + nn) ;
      }
      nn = 0;
      adj = 3;
    }
    if(str.length > (3*i + 3))
    {
      let xi = str.length - (3 * i + 3);
      apnd +=  str.substr(3 * i + 3,xi);
    }

    return apnd.split('').reverse().join('');
    //return value.toString().replace(/(\d)(?=(\d{3})+\.)/g, '1,');
  }
}
