import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateTeamComponent } from './pages/team/create-team/create-team.component';
import { TeamComponent } from './pages/team/team/team.component';
import { ManageTeamComponent } from './pages/team/manage-team/manage-team.component';
import { PlayerComponent } from './pages/player/player/player.component';
import { CreatePlayerComponent } from './pages/player/create-player/create-player.component';
import { EditPlayerComponent } from './pages/player/edit-player/edit-player.component';
import { DeletePlayerComponent } from './pages/player/delete-player/delete-player.component';
import { ExportComponent } from './pages/export/export.component';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'account', component: AccountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'team', component: TeamComponent },
  { path: 'team/create-team', component: CreateTeamComponent },
  { path: 'team/manage-team/:id', component: ManageTeamComponent },
  { path: 'player', component: PlayerComponent },
  { path: 'player/create-player', component: CreatePlayerComponent },
  { path: 'player/edit-player/:id', component: EditPlayerComponent },
  { path: 'player/delete-player/:id', component: DeletePlayerComponent },
  { path: 'export', component: ExportComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
