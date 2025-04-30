import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { WikiCardComponent } from '../wiki-card/wiki-card.component';

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
  
  // Sample wiki articles for demonstration
  wikiArticles = [
    {
      title: 'Angular (web framework)',
      description: 'Angular is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.',
      link: 'https://en.wikipedia.org/wiki/Angular_(web_framework)'
    },
    {
      title: 'Material Design',
      description: 'Material Design is a design language developed by Google in 2014. It uses more grid-based layouts, responsive animations and transitions, padding, and depth effects such as lighting and shadows.',
      link: 'https://en.wikipedia.org/wiki/Material_Design'
    },
    {
      title: 'TypeScript',
      description: 'TypeScript is a free and open-source high-level programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language.',
      link: 'https://en.wikipedia.org/wiki/TypeScript'
    },
    { 
      title: 'Web component',
      description: 'Web components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.',
      link: 'https://en.wikipedia.org/wiki/Web_Components'
    }
  ];

  onSearch(): void {
    // This will be implemented later to call the remote API
    console.log('Searching for:', this.searchQuery);
  }
}
