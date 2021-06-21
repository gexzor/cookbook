import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/Chips';
import { Ingredient } from 'src/app/shared/models/Ingredient';
import { Recipe } from 'src/app/shared/models/Recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss'],
})
export class CreateRecipeComponent implements OnInit {
  public ingredientList: Ingredient[] = [];
  public addOnBlur = true;
  public recipeForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    ingredients: new FormControl(''),
  });
  constructor(private recipeService: RecipeService) {}

  public removeIngredient(ingredient: Ingredient): void {
    this.ingredientList.forEach((item, index: number) => {
      if (item === ingredient) this.ingredientList.splice(index, 1);
    });
  }

  public addIngredient(event: MatChipInputEvent): void {
    if (event.value) {
      const newIngredient: Ingredient = { name: (event.value || '').trim() };

      // Add our fruit
      if (newIngredient) {
        this.ingredientList.push(newIngredient);
      }

      // Clear the input value
      event.chipInput!.clear();
    }
  }

  public onSubmit(): void {
    if (this.recipeForm.valid) {
      // TODO: Have the form populate the ingredients list, instead of saving it to a separate variable first
      const newRecipe: Recipe = this.recipeForm.value;
      newRecipe.ingredients = this.ingredientList;
      this.createRecipe(newRecipe);
    }
    this.resetForm();
  }

  public resetForm(): void {
    this.recipeForm.reset();
  }

  public createRecipe(recipe: Recipe): void {
    this.recipeService.createRecipe(recipe);
  }

  ngOnInit(): void {}
}
