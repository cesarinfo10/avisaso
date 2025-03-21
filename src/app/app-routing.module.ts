import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./pages/map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'servicios',
    loadChildren: () => import('./pages/servicios/servicios.module').then( m => m.ServiciosPageModule)
  },
  {
    path: 'busqueda',
    loadChildren: () => import('./pages/busqueda/busqueda.module').then( m => m.BusquedaPageModule)
  },
  {
    path: 'licitar',
    loadChildren: () => import('./pages/licitar/licitar.module').then( m => m.LicitarPageModule)
  },
  {
    path: 'mis-licitaciones',
    loadChildren: () => import('./pages/mis-licitaciones/mis-licitaciones.module').then( m => m.MisLicitacionesPageModule)
  },
  {
    path: 'ver-mi-licitacion/:id',
    loadChildren: () => import('./pages/ver-mi-licitacion/ver-mi-licitacion.module').then( m => m.VerMiLicitacionPageModule)
  },
  {
    path: 'licitaciones',
    loadChildren: () => import('./pages/licitaciones/licitaciones.module').then( m => m.LicitacionesPageModule)
  },
  {
    path: 'perfil/:dni',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'cargar-trabajo',
    loadChildren: () => import('./pages/perfil/cargar-trabajo/cargar-trabajo-routing.module').then( m => m.CargarTrabajoPageRoutingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
