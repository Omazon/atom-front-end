import {DashboardComponent} from "./dashboard/dashboard.component";
import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {authGuard} from "./auth.guard";


export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
]
