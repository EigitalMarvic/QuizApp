import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { QuestionsComponent } from './components/questions/questions.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './service/auth/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'signup',pathMatch:'full'},
  {path:'signup', component:SignUpComponent},
  {path:'questions',component:QuestionsComponent,canActivate:[AuthGuard]},
  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
