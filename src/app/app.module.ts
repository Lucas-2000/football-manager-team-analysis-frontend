import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';

import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateTeamComponent } from './pages/team/create-team/create-team.component';
import { TeamComponent } from './pages/team/team/team.component';
import { ManageTeamComponent } from './pages/team/manage-team/manage-team.component';
import { PlayerComponent } from './pages/player/player/player.component';
import { CreatePlayerComponent } from './pages/player/create-player/create-player.component';
import { EditPlayerComponent } from './pages/player/edit-player/edit-player.component';
import { DeletePlayerComponent } from './pages/player/delete-player/delete-player.component';
import { ExportComponent } from './pages/export/export.component';
import { AccountComponent } from './pages/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LandingPageComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    DashboardComponent,
    SidebarComponent,
    CreateTeamComponent,
    TeamComponent,
    ManageTeamComponent,
    PlayerComponent,
    CreatePlayerComponent,
    EditPlayerComponent,
    DeletePlayerComponent,
    ExportComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    CookieModule.withOptions(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
