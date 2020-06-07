import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guards/user-guard/user.guard';
import { AdminGuard } from './guards/admin-guard/admin.guard';


const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth_module/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'store',
		loadChildren: () => import('./store_module/store.module').then(m => m.StoreModule)
	},
	{
		path: 'admin',
		loadChildren: () => import('./admin_module/admin.module').then(m => m.AdminModule),
		// canActivate: [AdminGuard]
	},
	{
		path: 'user',
		loadChildren: () => import('./user_module/user.module').then(m => m.UserModule),
		// canActivate: [UserGuard]
	},
	{
		path: '**',
		redirectTo: 'store'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
