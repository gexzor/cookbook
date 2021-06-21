import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { Recipe } from 'src/app/shared/models/Recipe';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { RecipeComponent } from '../recipe/recipe.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  public recipes$: Observable<Recipe[]> = new Observable<Recipe[]>();
  public snackbarDuration = 5000;

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }

  public openDialog(recipe: Recipe): void {
    let dialogRef = this.dialog.open(RecipeComponent);
    dialogRef.componentInstance.recipe = recipe;
  }

  public deleteRecipe(recipe: Recipe, event: MouseEvent): void {
    this.snackbar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      panelClass: 'snackbar-primary',
      data: {
        recipe: recipe,
        duration: this.snackbarDuration,
      },
    });
    event.stopPropagation();
    //   this.recipeService.deleteRecipe(recipe);
  }
}
