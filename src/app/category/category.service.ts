import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from  'rxjs';
import {Category} from './category'
import {Clue} from './clue'

@Injectable()
export class CategoryService {

   configUrl =  "http://jservice.io/api/"
  constructor(private http: HttpClient) { }

  getCategories(offset, count) {
  return this.http.get(this.configUrl+"categories?offset="+offset+"&count="+count);
  }

  getClues(url) : Observable<Clue[]> {
  return this.http.get<Clue[]>(this.configUrl + url);
  }

}
