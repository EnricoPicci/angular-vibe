import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wiki-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './wiki-card.component.html',
  styleUrl: './wiki-card.component.css'
})
export class WikiCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() link: string = '';
  @Input() key: string = '';
  @Output() readMore = new EventEmitter<void>();
}
