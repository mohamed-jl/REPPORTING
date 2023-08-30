import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Filters } from '../../model/Filters';
import { FilterType } from 'src/model/FilterType';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filterType!: FilterType;
  filters!: Filters;

  filtredUpdatedFunctionChart: Subject<Filters> = new Subject<Filters>();
  filtredUpdatedChart: Subject<Filters> = new Subject<Filters>();

  // Rest of the code...
}
