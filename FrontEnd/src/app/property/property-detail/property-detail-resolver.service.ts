import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from 'src/app/model/property';
import { DwellingService } from 'src/app/services/dwelling.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

  constructor(private router: Router, private housingService: DwellingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<any> {
    const propId = route.params['id'];
    return this.housingService.getProperty(+propId).pipe(
      catchError(error => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
    // .pipe(
    //   catchError(error=>{
    //   this.router.navigate(['/']);
    //   return of(null);
    // })
    // );
  }
}
