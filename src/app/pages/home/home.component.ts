import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { WikiCardComponent } from '../../components/wiki-card/wiki-card.component';
import { WikipediaService, WikiPage } from '../../services/wikipedia.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    WikiCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchQuery: string = '';
  wikiArticles: WikiPage[] = [];

  constructor(private wikipediaService: WikipediaService, private stateService: StateService) {}

  onSearch(): void {
    if (!this.searchQuery.trim()) {
      this.wikiArticles = [];
      return;
    }
    this.wikipediaService.searchArticles(this.searchQuery, 10).subscribe({
      next: resp => {
        this.wikiArticles = resp.pages;
      },
      error: err => {
        console.error('Wikipedia search failed', err);
        this.wikiArticles = [];
      }
    });
  }

  onReadMore(article: WikiPage): void {
    this.stateService.setSelectedWikiCard(article);
  }
}
