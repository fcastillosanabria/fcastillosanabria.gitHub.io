import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactMeComponent } from './views/contact-me/contact-me.component';
import { HomeComponent } from './views/home/home.component';
import { PublicationsComponent } from './views/publications/publications.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChatBotComponent } from './shared/chat-bot/chat-bot.component';
import { CustomCursorComponent } from './shared/custom-cursor/custom-cursor.component';
import { SocialMediaComponent } from './shared/social-media/social-media.component';
import { LanguageSelectorComponent } from './shared/language-selector/language-selector.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PreloaderComponent } from './shared/preloader/preloader.component';

// Función para crear el loader de traducciones
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ContactMeComponent,
    PublicationsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ChatBotComponent,
    CustomCursorComponent,
    SocialMediaComponent,
    LanguageSelectorComponent,
    PreloaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
