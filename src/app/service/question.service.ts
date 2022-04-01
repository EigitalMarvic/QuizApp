import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAnswers } from '../model/question.model';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  userAnswers: UserAnswers[] = [];
  constructor(private http: HttpClient) {}

  //get questions list from Json file
  //to be uploaded to local storage when sign up
  getQuestions() {
    return this.http.get<any>('assets/questions.json');
  }

  //when enter Contest is click after signup
  //set Questions to LocalStorage and navigate to questions
  setQuestionsToLocalStorage() {
     return this.getQuestions().subscribe(({ questions }) => {
      localStorage.setItem('Questions', JSON.stringify(questions));
    });
  }

  //getting questions directly to local Storage
  getLocalStorageQuestions() {
    return JSON.parse(localStorage.getItem('Questions')!);
  }

   //reset whole localStorage Datas
 resetLocalStorage(){
  return localStorage.clear();
  }
//reset local storage UserAnswers
  resetUsersAnswerFromLS(){
    return localStorage.removeItem("UserAnswers")
  }
//set to localstorage UserAnswers[] when user answered questions
  setUserAnswersToLS(answer:any){
    this.userAnswers.push({'answer':answer.text,'points':answer.correct? 100:0});
    localStorage.setItem('UserAnswers',JSON.stringify(this.userAnswers));

  }
}
