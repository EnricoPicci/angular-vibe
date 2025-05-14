import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { WikiPage } from './wikipedia.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private selectedWikiCardSubject = new BehaviorSubject<WikiPage | undefined>(undefined);
  selectedWikiCard$: Observable<WikiPage | undefined> = this.selectedWikiCardSubject.asObservable();

  setSelectedWikiCard(card: WikiPage): void {
    this.selectedWikiCardSubject.next(card);
  }
}
