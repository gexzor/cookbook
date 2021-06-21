import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { interval } from 'rxjs';
import { Recipe } from 'src/app/shared/models/Recipe';

interface SnackbarData {
  recipe: Recipe;
  duration: number;
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackbarComponent implements OnInit {
  public progress = 100;
  public totalTime = 0;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData) {
    this.progressTimer(this.data.duration);
  }

  ngOnInit(): void {}

  public progressTimer(duration: number) {
    const timer$ = interval(1000);

    const sub = timer$.subscribe((time: number) => {
      this.progress = (time * 100) / duration;
      this.totalTime += time;

      if (this.totalTime >= duration) {
        sub.unsubscribe();
      }
    });
  }
}

/* TODO: Rename this component for a more general use across the application */
