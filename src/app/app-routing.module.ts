import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [UsuarioGuard]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  /* en el path del login es el path por defecto, estaba en reditect to login pero ahora le pongo main ya que al usar un
   guard no me va a dejar ir a las otras 
  paginas sin token, de esa manera si ya estoy autenticado no me manda al login */
  {path: '', pathMatch: 'full', redirectTo: 'main/tabs/tab1'},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
