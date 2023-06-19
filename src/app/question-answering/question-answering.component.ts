import { Component } from '@angular/core';
import { QaService } from '../services/qa.service';

@Component({
  selector: 'app-question-answering',
  templateUrl: './question-answering.component.html',
  styleUrls: ['./question-answering.component.scss']
})
export class QuestionAnsweringComponent {


  answer:any;

  constructor(private service: QaService) { }

  ngOnInit(): void {
    const data = {
      argument: "quiet and less crowded beaches in Santorini?"
    }

    this.service.Question_Answering_System(data).subscribe({
      next: (res) => {
        this.answer = res;
        console.log(this.answer);
    }});
  }


}
