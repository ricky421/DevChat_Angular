import { Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate } from'@angular/fire/auth-guard';
import { SignupFormComponent } from './app/signup-form/signup-form.component';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { ChatroomComponent } from './app/chatroom/chatroom.component';

//If you try to access chat without logging in
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const appRoutes: Routes = [
    { path: 'signup', component: SignupFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'chat', component: ChatroomComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
];
