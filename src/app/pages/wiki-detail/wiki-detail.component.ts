import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { WikipediaService, WikiSummaryResponse } from '../../services/wikipedia.service';
import { Subject, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-wiki-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './wiki-detail.component.html',
  styleUrl: './wiki-detail.component.css'
})
export class WikiDetailComponent implements OnDestroy {
  summary?: WikiSummaryResponse;
  loading = true;
  error?: string;
  private sub: Subscription;

  constructor(
    private stateService: StateService,
    private wikipediaService: WikipediaService
  ) {
    this.sub = this.stateService.selectedWikiCard$
      .pipe(
        switchMap(card => {
          if (card && card.key) {
            this.loading = true;
            this.error = undefined;
            return this.wikipediaService.getArticleSummary(card.key);
          } else {
            this.loading = false;
            this.error = 'No WikiCard selected.';
            return [];
          }
        })
      )
      .subscribe({
        next: summary => {
          this.summary = summary;
          this.loading = false;
        },
        error: err => {
          this.error = 'Could not load article summary.';
          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
