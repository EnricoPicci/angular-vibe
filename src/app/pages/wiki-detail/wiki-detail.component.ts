import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../../services/state.service';
import { WikiPage } from '../../services/wikipedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wiki-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wiki-detail.component.html',
  styleUrl: './wiki-detail.component.css'
})
export class WikiDetailComponent implements OnDestroy {
  selectedWikiCard?: WikiPage;
  private sub: Subscription;

  constructor(private stateService: StateService) {
    this.sub = this.stateService.selectedWikiCard$.subscribe(card => {
      this.selectedWikiCard = card;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
