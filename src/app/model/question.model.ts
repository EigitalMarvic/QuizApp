export class Question {
  questionId: number;
  questionText:string;
  answerOptions:AnswerOptions[];
  explanation:string;
  constructor(questionId:number,questionText:string,answerOptions:AnswerOptions[], explanation:string){
    this.questionId=questionId;
    this.questionText=questionText;
    this.answerOptions=answerOptions;
    this.explanation=explanation;
  }
}


export class AnswerOptions {
  answerId:string;
  text:string;
  correct?:boolean;
  constructor(answerId:string, text:string,correct:boolean){
    this.answerId =answerId;
    this.text=text;
    this.correct=correct;
  }
}

export class UserAnswers{
  answer:string;
  points:number;
  constructor(answer:string, points:number){
    this.answer = answer;
    this.points = points;
  }
}
