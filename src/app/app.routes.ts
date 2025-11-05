import { Routes } from '@angular/router';
import { HomeComponent } from './features/public/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { PaymentsListComponent } from './features/payments/payments-list/payments-list.component';

export const routes: Routes = [
   {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'payments',
    component: PaymentsListComponent,
  },
];
