import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipeCollection: AngularFirestoreCollection<Recipe[]>;
  private recipes: Observable<Recipe[]> = new Observable<Recipe[]>();

  //   constructor(private firestore: AngularFirestore) {
  //     this.recipeCollection = this.firestore.collection('recipes');
  //     this.recipes = new Observable<Recipe[]>();
  //   }

  //   public getRecipes(): Observable<Recipe[]> {
  //     return this.recipes || this.initRecipes();
  //   }

  //   public createRecipe(recipe: Recipe) {
  //     return new Promise<any>((resolve, reject) => {
  //       this.firestore
  //         .collection('recipes')
  //         .add(recipe)
  //         .then(
  //           (res) => {},
  //           (err) => reject(err)
  //         );
  //     });
  //   }

  constructor(private firestore: AngularFirestore) {
    this.recipeCollection = this.firestore.collection('recipes');
  }

  /**
   * Retrieves all recipes from the database.
   */
  public getRecipes(): Observable<Recipe[]> {
    return this.recipes || this.initRecipes();
  }

  /**
   * Creates a new recipe.
   * @param `Recipe`
   */
  public createRecipe(recipe: Recipe): void {
    this.firestore.collection('recipes').add(recipe);
  }

  /**
   * Deletes a the provided recipe from the database.
   * @param `POST` The recipe which is being deleted.
   */
  deleteRecipe(recipe: Recipe): void {
    this.firestore.collection('recipes').doc(recipe.id).delete();
  }

  /**
   * Initialize the Recipe observable list and return it
   * @returns The recipe observable list
   */
  private initRecipes(): Observable<Recipe[]> {
    // Set the observable list to a custom mapping to the firebase snapshot changes
    this.recipes = this.recipeCollection.snapshotChanges().pipe(
      map((changes: DocumentChangeAction<Recipe[]>[]) => {
        return changes.map((changeAction: DocumentChangeAction<Recipe>) => {
          // Map each changed item to a company object and set the id as well
          const recipe = changeAction.payload.doc.data() as Recipe;
          recipe.id = changeAction.payload.doc.id;
          return recipe;
        });
      })
    );
    // Return the observable list
    return this.recipes;
  }
}
