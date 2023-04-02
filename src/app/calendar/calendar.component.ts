
import { Component, OnInit } from '@angular/core';
import { SolutionService } from '../_services/Solution.service';
import { Availability } from '../models/Availability';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from "@fullcalendar/daygrid"; // useful for typechecking



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  events: any[] = [];

  constructor(private solutionService: SolutionService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin]
  };

  ngOnInit(): void {
    // Fetch all availabilities for the solution and add them as events to the calendar
    this.solutionService.getAllAvailabilities().subscribe((availabilities: Availability[]) => {
      const events = availabilities.map(av => ({
        id: av.id,
        title: 'Available',
        start: av.startDateTime,
        end: av.endDateTime,
        color: '#008000'
      }));
      this.events = events;
    });
  }

  handleDateSelect(selectInfo: any) {
    // Handle date selection and create a new availability
    const newAvailability = new Availability();
    newAvailability.startDateTime = selectInfo.startStr;
    newAvailability.endDateTime = selectInfo.endStr;
    this.solutionService.createAvailability(newAvailability).subscribe((createdAvailability: Availability) => {
      // Add the new availability as an event to the calendar
      this.events = this.events.concat({
        id: createdAvailability.id,
        title: 'Available',
        start: createdAvailability.startDateTime,
        end: createdAvailability.endDateTime,
        color: '#008000'
      });
    });
  }

  handleEventClick(clickInfo: any) {
    // Handle event click and remove the availability
    const availabilityId = clickInfo.event.id;
    this.solutionService.deleteAvailability(availabilityId).subscribe(() => {
      // Remove the availability from the calendar
      this.events = this.events.filter(event => event.id !== availabilityId);
    });
  }
}
