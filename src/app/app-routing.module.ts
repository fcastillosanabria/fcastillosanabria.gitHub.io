import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PublicationsComponent } from './views/publications/publications.component';
import { ContactMeComponent } from './views/contact-me/contact-me.component';

const routes: Routes = [

  // Default route
  { path: '', component: HomeComponent },

  { path: 'home', component: HomeComponent },

  { path: 'contact', component: ContactMeComponent },

  { path: 'publications', component: PublicationsComponent },

  // Ruta comodín: cualquier ruta NO definida redirige a inicio
  { path: '**', redirectTo: '', pathMatch: 'full' },

];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',          // ✅ Permite hacer scroll a los fragmentos (#id)
  scrollPositionRestoration: 'enabled', // ✅ Mantiene posición o sube al top al cambiar de ruta
  scrollOffset: [0, 70],                // ✅ Desplazamiento opcional (por navbar fijo)
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
