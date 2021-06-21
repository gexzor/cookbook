import { Review } from '../Review';
import { Ingredient } from './Ingredient';

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  description: string;
  id?: string;
  upvotes?: number;
  downvotes?: number;
  reviews?: Review[];
}
