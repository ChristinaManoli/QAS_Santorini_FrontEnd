import { Component, OnInit } from '@angular/core';
import { QaService } from '../services/qa.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import NeoVis from 'neovis.js/dist/neovis.js';


export interface Message {
  type: string;
  message: string;
  id: string;
}

@Component({
  selector: 'app-question-answering',
  templateUrl: './question-answering.component.html',
  styleUrls: ['./question-answering.component.scss']
})
export class QuestionAnsweringComponent implements OnInit {
  searchTerm: any;
  messages: Message[] = [];
  //ids: string[] = [];

  createForm: any;
  question: any;
  response: any;
  private neoVis: any;
  counter: any = 0;


  constructor(private service: QaService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      question: ['', [Validators.required]]
    });

    this.messages.push({
      type: 'system',
      message: 'Hi, I am your travel support agent for Santorini. How can I help you?',
      id: ''
    });

  }

  draw(divId: string, cypher : string) {
    var config = {
      containerId: divId,
      neo4j: {
        serverUrl: "neo4j://609579ea.databases.neo4j.io",
        serverUser: "neo4j",
        serverPassword: "santorinikg2023",
      },
      labels: {},
      relationships: {},
      initialCypher: cypher
    }

    console.log(cypher);
    this.neoVis = new NeoVis(config);
    this.neoVis.render();
    setTimeout(() => {
      const div = document.getElementById(divId);
      if (div) {
        div.style.display = 'block';
      }
    }, 700);
  }

  sendMessage(): void {
    this.counter++;
    const divId = "viz" + this.counter;


    this.question = this.createForm.get('question').value;
    this.messages.push({
      type: 'client',
      message: this.question,
      id: '',
    });

    this.service.Question_Answering_System(this.question).subscribe({
      next: (res) => {
        this.response = res
        this.messages.push({
          type: 'viz',
          message: '',
          id: divId,
        });

        setTimeout(() => {
          this.draw(divId, this.response.result1);
        }, 0);

        setTimeout(() => {
          this.messages.push({
            type: 'system',
            message: "Would you like to know more about: " + this.response.result2,
            id: '',
          });
        }, 2500);
      }
    });
    this.createForm.reset();
  }
}
