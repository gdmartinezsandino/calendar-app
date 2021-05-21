import { TestBed } from '@angular/core/testing';
import { v4 as uuidv4 } from 'uuid';

import { CalendarService } from './calendar.service';
import { Reminder } from '@interfaces/reminder';

describe('CalendarService', () => {
  let service: CalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create should add a new reminder', () => {
    service.reminder = {
      id: uuidv4(),
      text: 'Lorem Ipsum is simply dummy',
      dateTime: new Date(),
      color: '#31B550',
      city: 'Medellin',
    };
    spyOn(service, 'reminder');
    service.create(service.reminder);
    expect(service.reminder.id).toBeDefined();
    expect(service.reminder.text.length).toBeLessThanOrEqual(30);
    expect(service.reminder.city.length).toBeLessThanOrEqual(30);
  });

  it('edit should edit an existing reminder', () => {
    const reminders = [{
      id: uuidv4(),
      text: 'Lorem Ipsum is simply dummy',
      dateTime: new Date(),
      color: '#31B550',
      city: 'Medellin',
    }];
    service.reminders = reminders;
    const reminderToEdit = {
      id: service.reminders[0].id,
      text: 'Text update',
      dateTime: service.reminders[0].dateTime,
      color: service.reminders[0].color,
      city: service.reminders[0].city,
    }
    spyOn(service, 'reminders');
    service.edit(reminderToEdit);
    expect(service.reminders[0].text).toContain(reminders[0].text);
  });

  it('delete should remove an existing reminder', () => {
    const reminders = [{
      id: uuidv4(),
      text: 'Lorem Ipsum is simply dummy',
      dateTime: new Date(),
      color: '#31B550',
      city: 'Medellin',
    }];
    service.reminders = reminders;
    spyOn(service, 'reminders');
    service.delete(service.reminders[0].id);
    expect(service.reminders.length).toBeLessThan(reminders.length);
  });
});
