import { Component, OnInit } from '@angular/core';
import {Subscription, forkJoin } from 'rxjs'
import { Observable} from 'rxjs';
import {CategoryService} from './category.service';
import {Category} from './category'
import {Clue} from './clue'
import {AbstractControl, FormBuilder, FormGroup, Validators , FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers : [CategoryService],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '100%',
        opacity: 1,
        backgroundColor: 'white'
      })),
      state('closed', style({
        height: '10%',
        opacity: 1,
        backgroundColor: 'white'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})

export class CategoryComponent implements OnInit {

  private subscription: Subscription;
  category : Category[];
  categoryResults : Category[];
    autoTicks = false;
    disabled = false;
    invert = false;
    max = 1000;
    min = 100;
    showTicks = true;
    step = 100;
    thumbLabel = true;
    value = 0;
    vertical = false;

    categoryCtrl = new FormControl();
    filteredCategories: Observable<Category[]>;

    minDate;
    maxDate;
    selectedCategory;
    difficultLevel;
    clues : Clue[];
    clueGrid : any[];
    displayedColumns: string[] = ['category', 'question', 'value', 'answer'];

    isOpen = true;

  constructor(private categoryService : CategoryService) {

   }

  ngOnInit() {
    this.category = [];
    this.categoryResults = [];

    this.requestDataFromMultipleSources().subscribe(responseList => {
        this.category = responseList.flat(1);
        console.log("asfdadfs");
        console.log(this.category);
        this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
        startWith(''),
        map(category => category ? this._filterCategories(category) : this.category.slice())
     );
      });

      setTimeout(() => {
         this.isOpen = !this.isOpen;
      }, 4000);
}

public requestDataFromMultipleSources(): Observable<any[]> {
  let tempList = [];
  for (let i=0; i < 184 ; i++){
      /*this.subscription = this.categoryService.getCategories( i * 100 ,'100').subscribe(
        categoryResults => {
          //this.category = categoryResults;
          tempList.push(categoryResults)
        }
      );*/

      let category = this.categoryService.getCategories( i * 100 ,'100');
      tempList.push(category);

}
   // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
   console.log("test here");
   return forkJoin(tempList);
 }

private _filterCategories(value: string): Category[] {
   const filterValue = value.toLowerCase();
    return this.category.filter(category => category.title ? (category.title.toLowerCase().indexOf(filterValue) === 0) : false);
}

toggleView(item){
  if(item.hidden){
    item.hidden = false;
  } else{
    item.hidden = true;
  }
}

fetchClues()
{
  console.log(this.minDate);
  console.log(moment(this.minDate).format());
  console.log(this.maxDate);
  console.log(this.difficultLevel);
  console.log(this.selectedCategory);
  let url="clues?";
  if(this.difficultLevel){
    url = url + "value=" + this.difficultLevel
  }
  if(this.minDate){
    url =  url + "&minDate=" + this.minDate
  }
  if(this.maxDate){
      url =  url + "&maxDate=" + this.maxDate
  }
  if(this.selectedCategory){
      url =  url + "&category=" + this.selectedCategory
  }
  console.log(url);
  this.subscription = this.categoryService.getClues(url).subscribe(clues=>{
    this.clues = [];
    let tempClues = clues;
  //  this.clues = clues;
    for(let i=0;i<tempClues.length; i++){
      if(tempClues[i].question){
        this.clues.push(tempClues[i]);
      }
  }
  this.clueGrid = [];
  for (let i = 0; i < this.clues.length; i += 5) {
      this.clueGrid.push({ items: this.clues.slice(i, i + 5) });
  }

  console.log(this.clues);
}
)

}


}
