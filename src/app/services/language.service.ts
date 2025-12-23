import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'todl-language';
  private readonly DEFAULT_LANGUAGE = 'en';
  private readonly AVAILABLE_LANGUAGES = ['en', 'ro'];

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    // Set available languages
    this.translate.addLangs(this.AVAILABLE_LANGUAGES);

    // Set default language
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);

    // Get saved language or use default
    const savedLanguage = this.getSavedLanguage();
    const languageToUse = this.AVAILABLE_LANGUAGES.includes(savedLanguage) ? savedLanguage : this.DEFAULT_LANGUAGE;

    this.setLanguage(languageToUse);
  }

  public setLanguage(lang: string): void {
    if (this.AVAILABLE_LANGUAGES.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem(this.STORAGE_KEY, lang);
    }
  }

  public getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  public getAvailableLanguages(): string[] {
    return this.AVAILABLE_LANGUAGES;
  }

  private getSavedLanguage(): string {
    return localStorage.getItem(this.STORAGE_KEY) || this.DEFAULT_LANGUAGE;
  }

  public getLanguageName(code: string): string {
    const names: { [key: string]: string } = {
      en: 'English',
      ro: 'Română'
    };
    return names[code] || code;
  }

  public getLanguageFlag(code: string): string {
    const flags: { [key: string]: string } = {
      en: '🇬🇧',
      ro: '🇷🇴'
    };
    return flags[code] || '🌐';
  }
}
