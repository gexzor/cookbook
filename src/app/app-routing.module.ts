import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
  { path: 'create-recipe', component: CreateRecipeComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: '**', component: RecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
