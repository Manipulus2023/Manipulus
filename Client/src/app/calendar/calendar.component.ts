import { Component, ChangeDetectorRef } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput, EventSourceInput } from '@fullcalendar/core';
import { JobService } from '../job/job.service';
import { Job } from '../job/job';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  calendarVisible = true;
  calendarOptions: CalendarOptions;
  currentEvents: EventApi[] = [];
  jobs: Job[];

  constructor(
    private changeDetector: ChangeDetectorRef,
    private jobService: JobService
  ) 
  {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      },
      initialView: 'dayGridMonth',
      events: [],
    };
  }

  ngOnInit() {
    this.getJobs();
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }
  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  getJobs(): void {
    this.jobService.getJobList().subscribe(
      (response: Job[]) => {
        this.jobs = response;
        this.calendarOptions.events = this.jobs.map((job: Job) => {
          return {
            title: job.job_type.concat(' ').concat(job.customer.name),
            start: job.job_date,
            allDay: true,
          };
        });
        this.changeDetector.detectChanges();
      },
      (error: HttpErrorResponse) => alert(error.message)
    );
  }
}

function createEventId() {
  return String(eventGuid++);
}

let eventGuid = 0;
