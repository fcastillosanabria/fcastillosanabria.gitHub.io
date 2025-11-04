import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent {
currentLang = 'es';
  currentFlag = 'assets/flags/es.png'; // bandera inicial

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['es', 'en']);
    const savedLang = localStorage.getItem('lang') || 'es';
    this.switchLanguage(savedLang);
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.currentFlag = lang === 'es' ? 'assets/flags/es.png' : 'assets/flags/en.jpeg';
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
