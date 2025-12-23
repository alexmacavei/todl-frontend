import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="langMenu" class="language-switcher">
      <span class="flag flag-trigger flag-emoji" aria-hidden="true">{{ getLanguageFlagEmoji(currentLanguage) }}</span>
    </button>
    <mat-menu #langMenu="matMenu">
      @for (lang of availableLanguages; track lang) {
        <button mat-menu-item (click)="switchLanguage(lang)" [class.active]="lang === currentLanguage">
          <span class="flag-emoji flag-menu" aria-hidden="true">{{ getLanguageFlagEmoji(lang) }}</span>
          <span class="flag-text">{{ languageService.getLanguageName(lang) }}</span>
        </button>
      }
    </mat-menu>
  `,
  styles: [
    `
      .language-switcher {
        margin-left: 8px;
      }

      .flag {
        display: inline-block;
        flex: 0 0 auto;
        object-fit: contain;
        vertical-align: middle;
        line-height: 1;
      }

      /* Ensure emoji font is used (Windows, macOS, Linux fallbacks) */
      .flag-emoji {
        font-family:
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', 'Apple Color Emoji', 'EmojiOne Mozilla', system-ui,
          sans-serif;
        font-size: 18px;
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

      /* Trigger button flag */
      .flag-trigger {
        width: 32px;
        height: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: -10px;
        padding-right: 7px;
      }

      /* Small spacing for text */
      .flag-text {
        margin-left: 8px;
      }

      mat-menu button .flag-menu {
        width: 28px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
    `
  ]
})
export class LanguageSwitcherComponent {
  availableLanguages: string[];
  currentLanguage: string;

  constructor(
    public languageService: LanguageService,
    private translate: TranslateService
  ) {
    this.availableLanguages = this.languageService.getAvailableLanguages();
    this.currentLanguage = this.languageService.getCurrentLanguage();

    // Subscribe to language changes to keep UI in sync
    this.translate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
    });
  }

  switchLanguage(lang: string): void {
    this.languageService.setLanguage(lang);
    this.currentLanguage = lang;
  }

  getLanguageFlagEmoji(lang: string): string {
    const raw = this.languageService.getLanguageFlag(lang);
    if (!raw) {
      return '';
    }
    // If already contains a flag (regional indicator) return as-is
    if (Array.from(raw).some(ch => ch.codePointAt(0)! >= 0x1f1e6 && ch.codePointAt(0)! <= 0x1f1ff)) {
      return raw;
    }
    // If it's a two-letter code (e.g. "GB", "RO"), convert to regional indicators
    const candidate = String(raw)
      .trim()
      .replace(/[^A-Za-z]/g, '')
      .toUpperCase();
    if (candidate.length === 2) {
      return this.countryCodeToFlagEmoji(candidate);
    }
    // Fallback: return the original string
    return raw;
  }

  private countryCodeToFlagEmoji(code: string): string {
    const OFFSET = 0x1f1e6; // regional indicator symbol letter A
    const letters = code.toUpperCase().split('');
    if (letters.length !== 2) return code;
    const cps = letters.map(ch => OFFSET + (ch.charCodeAt(0) - 65));
    return String.fromCodePoint(...cps);
  }
}
