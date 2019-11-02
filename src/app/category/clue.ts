import {Category} from './category'

export class Clue {
  answer : string;
  id : number;
  question : string;
  value : number;
  airdate : string;
  category : Category;
  category_id : string
  game_id : string
  invalid_count : string
  created_at : string
  updated_at : string
  hiddent : boolean

  constructor(){
    this.answer = null;
    this.id = 0;
    this.question = null;
    this.value = 0;
    this.airdate = null;
    this.category = null;
    this.category_id = null
    this.game_id = null
    this.invalid_count = null
    this.created_at = null
    this.updated_at = null
    this.hiddent = false

  }
}
