import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  isEnterContestReady= false;
  constructor(
    private questionService:QuestionService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.questionService.setQuestionsToLocalStorage();
  }
    //Set user email to local storage
  //set isEnterContestReady to true to show enterContest button

  onSubmit(signUpForm: NgForm){
    this.isEnterContestReady = true;
    const {emailAddress} = signUpForm.value;
    this.authService.signUp(emailAddress);
  }

  //store questions to localstorage
  onEnterContest(){
    this.questionService.setQuestionsToLocalStorage();
  }
}
