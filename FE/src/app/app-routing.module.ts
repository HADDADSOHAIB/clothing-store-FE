import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guards/user-guard/user.guard';
import { AdminGuard } from './guards/admin-guard/admin.guard';


const routes: Routes = [
	{
		path: 'auth',
		loadChildren: './auth/auth.module#AuthModule'
	},
	{
		path: 'store',
		loadChildren: './store/store.module#StoreModule'
	},
	{
		path: 'admin',
		loadChildren: './admin/admin.module#AdminModule',
		canActivate: [AdminGuard]
	},
	{
		path: 'user',
		loadChildren: './user/user.module#UserModule',
		canActivate: [UserGuard]
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
