import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
// template: `<ejs-schedule width="850" height="650"></ejs-schedule>`,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
