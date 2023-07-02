import { Component, OnInit } from '@angular/core';
import { QaService } from '../services/qa.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import NeoVis from 'neovis.js/dist/neovis.js';


export interface Message {
  type: string;
  message: string | HTMLElement;
}

@Component({
  selector: 'app-question-answering',
  templateUrl: './question-answering.component.html',
  styleUrls: ['./question-answering.component.scss']
})
export class QuestionAnsweringComponent implements OnInit{
  searchTerm: any;
  messages: Message[] = [];
  createForm: any ;
  question: any;
  response : any;
  divElement!: HTMLDivElement;
  private neoVis: any;

  constructor(private service: QaService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      question: ['', [Validators.required]]
    }); 

    this.messages.push({
      type: 'system',
      message: 'Hi, I am your travel support agent for Santorini. How can I help you?',
    });

    this.divElement = document.createElement("div");
    this.divElement.id = "viz";
  }

  sendMessage(): void {
    this.question = this.createForm.get('question').value;
    this.messages.push({
      type: 'client',
      message: this.question,
    });
    
    this.service.Question_Answering_System(this.question).subscribe({
      next: (res) => 
      {
        this.response = res
        this.messages.push({
          type: 'system',
          message: this.divElement,
        });
        console.log(this.response.result1);

        this.draw();

        this.messages.push({
          type: 'system',
          message: "Would you like to know more about: " + this.response.result2,
        });
      }
    });
    this.createForm.reset();
  }

  draw() {
    console.log("hiiii");
    var config = {
      containerId: "viz",
      neo4j: {
        serverUrl: "neo4j://609579ea.databases.neo4j.io",
        serverUser: "neo4j",
        serverPassword: "santorinikg2023",
      },
      labels: {
        
      },
      relationships: {
      },
      initialCypher: 'MATCH (start{ns0__name:"Santorini"})-[r:ns0__containsPlace]->(end:ns1__Village) RETURN *'
    }

    this.neoVis = new NeoVis(config);
    this.neoVis.render();
  }

}
