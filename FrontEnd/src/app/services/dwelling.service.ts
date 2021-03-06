import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IPropertyBase } from '../model/ipropertybase';
import { IProperty } from '../model/Iproperty';
import { Property } from '../model/property';


@Injectable({
  providedIn: 'root'
})
export class DwellingService {

  constructor(private http:HttpClient) { }
  getAllProperties(SellRent:number): Observable<IProperty[]>{
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<IProperty> = [];
        const localProperties= JSON.parse(localStorage.getItem('newProp')||'{}');
        if(localProperties) {
          for (const id in localProperties) {
            if(localProperties.hasOwnProperty(id) && (localProperties as any)[id].SellRent===SellRent) {
            propertiesArray.push((localProperties as any)[id]);
          }
        }

        }

        for (const id in data) {
          if(data.hasOwnProperty(id) && (data as any)[id].SellRent===SellRent) {
          propertiesArray.push((data as any)[id]);
        }
      }
      return propertiesArray;
      })
    );
    return this.http.get<IProperty[]>('data/properties.json');
  }

  addProperty(property: Property) {
    let newProp = [property];
    //adding new property in array if newProp already exists in local storage
    if(localStorage.getItem('newProp')) {
      newProp=[property, ...JSON.parse(localStorage.getItem('newProp') || '{}')];
    }
    localStorage.setItem('newProp',JSON.stringify(property));
  }
  newPropID() {
    if(localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+(localStorage.getItem('PID') || '{}') + 1));
      return +(localStorage.getItem('PID') || '{}');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
