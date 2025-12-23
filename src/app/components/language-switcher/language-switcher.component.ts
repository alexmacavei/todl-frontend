import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="langMenu" class="language-switcher">
      <span class="flag">{{ getCurrentFlag() }}</span>
    </button>
    <mat-menu #langMenu="matMenu">
      @for (lang of availableLanguages; track lang) {
        <button mat-menu-item (click)="switchLanguage(lang)" [class.active]="lang === currentLanguage">
          <span class="flag">{{ languageService.getLanguageFlag(lang) }}</span>
          <span>{{ languageService.getLanguageName(lang) }}</span>
        </button>
      }
    </mat-menu>
  `,
  styles: [`
    .language-switcher {
      margin-left: 8px;
    }
    
    .flag {
      font-size: 24px;
      line-height: 1;
    }
    
    mat-menu button {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    mat-menu button.active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    mat-menu button .flag {
      font-size: 20px;
    }
  `]
})
export class LanguageSwitcherComponent {
  availableLanguages: string[];
  currentLanguage: string;

  constructor(public languageService: LanguageService) {
    this.availableLanguages = this.languageService.getAvailableLanguages();
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.currentLanguage = lang;
  }

  getCurrentFlag(): string {
    return this.languageService.getLanguageFlag(this.currentLanguage);
  }
}
