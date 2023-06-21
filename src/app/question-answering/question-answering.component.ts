import { Component, OnInit } from '@angular/core';
import { QaService } from '../services/qa.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


export interface Message {
  type: string;
  message: string;
}

@Component({
  selector: 'app-question-answering',
  templateUrl: './question-answering.component.html',
  styleUrls: ['./question-answering.component.scss']
})
export class QuestionAnsweringComponent {
  searchTerm: any;
  messages: Message[] = [];
  createForm: any ;
  question: any;
  response : any;


  constructor(private service: QaService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      question: ['', [Validators.required]]
    }); 

    this.messages.push({
      type: 'system',
      message: 'Hi, I am your travel support agent for Santorini. How can I help you?',
    });
  }

  sendMessage(): void {
    this.question = this.createForm.get('question').value;

    this.messages.push({
      type: 'client',
      message: this.question,
    });
    
    console.log(this.question);

    this.service.Question_Answering_System(this.question).subscribe({
      next: (res) => 
      {
        this.response = res
        console.log(this.response);
        this.messages.push({
          type: 'system',
          message: this.response.result1,
        });
        this.messages.push({
          type: 'system',
          message: "Would you like to know more about: " + this.response.result2,
        });
      }
      
    });
    

    
    this.createForm.reset();

  }
}
