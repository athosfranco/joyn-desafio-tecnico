import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { ClientListComponent } from './page/client-list/client-list.component';
import { NewClientComponent } from './page/new-client/new-client.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new-client', component: NewClientComponent },
  { path: 'client-list', component: ClientListComponent },
];
