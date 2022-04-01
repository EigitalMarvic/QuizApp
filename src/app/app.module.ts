import { CanDeactivate, CanActivate } from '@angular/router';
import { AuthGuard } from './service/auth/auth.guard';
import { AuthService } from './service/auth.service';
import { QuestionService } from 'src/app/service/question.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    SignUpComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [QuestionService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
