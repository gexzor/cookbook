import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/Recipe';
@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipeCollection: AngularFirestoreCollection<Recipe>;
  private recipes: Observable<Recipe[]>;

  constructor(private firestore: AngularFirestore) {
    this.recipeCollection = this.firestore.collection('recipes');
    this.recipes = this.getRecipes();
  }

  /**
   * Retrieves all recipes from the database.
   */
  public getRecipes(): Observable<Recipe[]> {
    return this.recipes || this.initiRecipes();
  }

  /**
   * Creates a new recipe.
   * @param `Recipe`
   */
  public createRecipe(recipe: Recipe): void {
    console.warn(recipe);
    this.firestore.collection('recipes').add(recipe);
  }

  /**
   * Deletes a the provided recipe from the database.
   * @param `Recipe` The recipe which is being deleted.
   */
  deletePost(recipe: Recipe): void {
    this.firestore.collection('recipes').doc(recipe.id).delete();
  }

  private initiRecipes(): Observable<Recipe[]> {
    this.recipes = this.recipeCollection.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<Recipe>[]) => {
        return changes.map((changeAction: DocumentChangeAction<Recipe>) => {
          const recipe = changeAction.payload.doc.data();
          recipe.id = changeAction.payload.doc.id;
          return recipe;
        });
      })
    );
    return this.recipes;
  }
}
