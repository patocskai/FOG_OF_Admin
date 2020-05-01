import { PassDataService } from 'src/app/services/pass-data.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<any> {

  constructor(private dataService: PassDataService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const id = route.paramMap.get('id');
    return this.dataService.getWorkGroup(id);
  }
}
