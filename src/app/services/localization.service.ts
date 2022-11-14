import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lang } from '../models/lang';
import { LayoutService } from './layout.service';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private currentLanguageSubject = new BehaviorSubject<string>('');

  constructor(
    private translate: TranslateService,
    private layout: LayoutService,
  ) {
    this.initLanguage();
  }

  /**
   * Initialization the language assignments with files for the third party service
   * then set the language across the app
   */
  initLanguage() {
    const language = this.getLanguage();
    this.translate.setDefaultLang(language);
    this.setLanguage(language);
    this.toggleDirection(language);
  }

  /**
   * set the language across the app
   * save the language in the local storage
   * @param lang (string) 'ar' or 'en'
   */

  setLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem(Lang.DEFAULT_LANGUAGE, lang);
    this.currentLanguageSubject.next(lang);
  }

  toggleDirection(lang: string) {
    const body = document.getElementsByTagName('body')[0];
    const html = document.getElementsByTagName('html')[0];
    html.setAttribute('lang', lang);

    if (lang === Lang.arabic) {
      body.classList.add('rtl');
      body.classList.remove('ltr');
    } else {
      body.classList.remove('rtl');
      body.classList.add('ltr');
    }
  }

  /**
   * get the language from local storage, if none set language to English
   * @returns current language
   */
  getLanguage(): string {
    if (!localStorage.getItem(Lang.DEFAULT_LANGUAGE)) {
      localStorage.setItem(Lang.DEFAULT_LANGUAGE, Lang.arabic);
    }

    return localStorage.getItem(Lang.DEFAULT_LANGUAGE) as string;
  }

  /**
   * update current language with the current selected language code
   * @param lang (string) 'ar' or 'en'
   */
  updateLanguage(lang: Lang) {
    if (lang == Lang.english) {
      this.currentLanguageSubject.next(Lang.english);
    } else {
      this.currentLanguageSubject.next(Lang.arabic);
    }
  }

  /**
   * get the last updated language
   * @returns an Observable of the last updated language
   */
  getCurrentLanguage(): Observable<string> {
    return this.currentLanguageSubject.asObservable();
  }

  /**
   * check if the language is arabic
   * @returns true if current language is arabic, otherwise false
   */
  isArabic(): boolean {
    return localStorage.getItem(Lang.DEFAULT_LANGUAGE) == Lang.arabic;
  }

  /**
   * check if the language is english
   * @returns true if current language is english, otherwise false
   */
  isEnglish(): boolean {
    return localStorage.getItem(Lang.DEFAULT_LANGUAGE) == Lang.english;
  }
}
