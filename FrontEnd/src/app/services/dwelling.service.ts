import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root',
})
export class DwellingService {
  constructor(private http: HttpClient) {}

  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5000/api/city');
  }
  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray=> {
        return propertiesArray.find(p=>p.Id === id);
      })
    );
  }
  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<Property> = [];
        const localProperties = JSON.parse(
          localStorage.getItem('newProp') || '{}'
        );
        if (localProperties) {
          for (const id in localProperties) {
            if (SellRent) {
              if (
                localProperties.hasOwnProperty(id) &&
                (localProperties as any)[id]?.SellRent === SellRent
              ) {
                propertiesArray.push((localProperties as any)[id]);
              }
            } else {
              propertiesArray.push((localProperties as any)[id]);
            }
          }
        }

        for (const id in data) {
          if (SellRent) {
            if (
              data.hasOwnProperty(id) &&
              (data as any)[id].SellRent === SellRent
            ) {
              propertiesArray.push((data as any)[id]);
            }
          } else {
            propertiesArray.push((data as any)[id]);
          }
        }
        return propertiesArray;
      })
    );
    return this.http.get<Property[]>('data/properties.json');
  }

  addProperty(property: Property) {
    let newProp = [property];
    //adding new property in array if newProp already exists in local storage
    if (localStorage.getItem('newProp')) {
      newProp = [
        property,
        ...JSON.parse(localStorage.getItem('newProp') || '{}'),
      ];
    }
    localStorage.setItem('newProp', JSON.stringify(property));
  }
  newPropID() {
    if (localStorage.getItem('PID')) {
      localStorage.setItem(
        'PID',
        String(+(localStorage.getItem('PID') || '{}') + 1)
      );
      return +(localStorage.getItem('PID') || '{}');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
