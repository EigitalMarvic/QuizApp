
import { Component, OnInit } from '@angular/core';
import { Router, CanDeactivate } from '@angular/router';
import { interval, Observable } from 'rxjs';

import { Question } from 'src/app/model/question.model';
import { AuthService } from 'src/app/service/auth.service';
import { QuestionService } from 'src/app/service/question.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questionList: Question[] = [];

  //property for alert correct and incorrect
  isSubmitted: boolean = false;
  isCorrectAnswer: boolean = false;
  answerSeletected: boolean = false;

  correctAnswers: number = 0;
  inCorrectAnswers: number = 0;
  points: number = 0;
  currentQuestion = 0;
  timeLeft: number = 15;
  interval$: any;
  timeOut: any = 0;

  constructor(
    private questionService: QuestionService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.questionList = this.questionService.getLocalStorageQuestions();
    this.startTimer();
  }

  startTimer() {
    this.interval$ = interval(1000).subscribe((val) => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
  //check if time = 0, then user answer will be incorrect and submitted
      const answerNull = {
          text: 'no Answer',
          correct: false
            };
          this.submitAnswer(answerNull);
          }
    });
    //set timeout to 17 because of the pause 2 sec timeout when showing answer results
      this.timeOut = setTimeout(() => {
        this.interval$.unsubscribe();
      }, 17000);
  }

  clearTimer() {
    this.interval$.unsubscribe();
    clearTimeout(this.timeOut);
    }

  //submit answer when user answered
  //call question service and will set to localstorage
  submitAnswer(answer: any) {
    this.questionService.setUserAnswersToLS(answer);
    this.clearTimer();
    this.points += answer.correct? 100 : 0;
    this.answerSeletected = true;

  if (answer.correct) {
    this.isCorrectAnswer=true;
    this.correctAnswers++;
  } else {
    this.isCorrectAnswer=false;
    this.inCorrectAnswers++;
  }

//checking if the questionsList are finished or not
//set timeout for 2 sec delay when checking answers
  if (this.currentQuestion < this.questionList.length - 1) {
      setTimeout(() => {
      this.answerSeletected = false;
      this.currentQuestion++;
      this.timeLeft = 15;
      this.startTimer();
      }, 2000);
  } else {
    setTimeout(() => {
      this.clearTimer();
      this.alertResults();
    }, 2000);

  }
}

  //resetQuiz variables, arrays,localStorage
  resetQuiz() {
    this.questionService.resetUsersAnswerFromLS();
    this.questionService.userAnswers = [];
    this.clearTimer();
    this.timeLeft=15;
    this.currentQuestion = 0;
    this.points = 0;
    this.correctAnswers = 0;
    this.inCorrectAnswers = 0;
    this.answerSeletected = false;
    this.startTimer()

}

  logout() {
    this.authService.logout();
    this.router.navigate(['/signup']);
  }

  // popup results when quiz done
  // shows accumulated points and correct answers
  alertResults() {
    var content ="";
    content =content +`<h6> Total Earning Points: ${this.points} </h6>`
    content =content +`<h6> Total Correct Answer: ${this.correctAnswers} / ${this.questionList.length} </h6> <br>`
    Swal.fire({

      title: 'Results!',
      text: `Total earning Points: ${this.points} correct answers:${this.correctAnswers}/ ${this.questionList.length} `,
      html:content,
      width: 600,
      padding: '3em',
      color: '#716add',
      background:
        '#fff url(https://media.giphy.com/media/Yrrcya4vVa7jKe4vSn/giphy.gif)',
      allowOutsideClick: false,
      //button cancel for logout and btn confirm for retry
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Logout',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Retry',

      backdrop: `
      rgb(240,255,255)
        url("https://media.giphy.com/media/Yrrcya4vVa7jKe4vSn/giphy.gif")
        left top
        no-repeat
      `,
    }).then((result) => {
      if (result.isConfirmed) {
        this.resetQuiz();
      } else if (result.dismiss) {
        this.questionService.resetLocalStorage();
        this.router.navigate(['/signup']);
      }
    });
  }

}
