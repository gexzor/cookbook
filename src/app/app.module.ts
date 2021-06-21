import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { SnackbarComponent } from './components/recipes/snackbar/snackbar.component';
import { TestComponent } from './components/test/test.component';
import { MaterialModule } from './material.module';
import { MousedownStopPropagationDirective } from './shared/directives/mousedown-stop-propagation.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateRecipeComponent,
    RecipesComponent,
    RecipeComponent,
    TestComponent,
    SnackbarComponent,
    MousedownStopPropagationDirective,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  entryComponents: [TestComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
