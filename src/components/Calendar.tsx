import React, { useState } from 'react';
import { useForm, Control, SubmitHandler, FieldErrors } from 'react-hook-form';
import moment from 'moment';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  View,
  Views,
  DateLocalizer,
  SlotInfo,
} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import RegistrationList from './RegistrationList';
import TimeRegistrationSummary from './TimeRegistrationSummary';
import TimeRegistrationForm from './TimeRegistrationForm';
import { TimeRegistrationEntry, TimeRegistrationFormData } from './types/TimeRegistrationEntry';

interface CalendarProps {
  selectedDate: Date;
  onDateClick: (date: Date) => void;
  events: Event[];
  onViewChange: (view: View, startDate?: Date, endDate?: Date) => void;
  onAddRegistration: (registration: TimeRegistrationEntry) => void;
  onDeleteRegistration: (id: string) => void;
  onUpdateRegistration: (id: string, formData: TimeRegistrationFormData) => void;
}

const localizer: DateLocalizer<moment.Moment> = momentLocalizer(moment);

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateClick,
  events,
  onViewChange,
  onAddRegistration,
  onDeleteRegistration,
  onUpdateRegistration,
}) => {
  const handleSelectSlot = ({ start }: SlotInfo) => {
    const newEvent: Event = {
      id: Date.now().toString(), // fixed to convert the number to a string
      title: 'New event',
      start,
      end: moment(start).add(1, 'hour').toDate(),
    };
    onDateClick(start);

    // open the TimeRegistrationForm when a new event is created
    onAddRegistration({
      id: newEvent.id,
      date: newEvent.start,
      startTime: newEvent.start,
      endTime: newEvent.end,
      description: '',
    });
  };

  const handleSelectEvent = (event: Event) => {
    onDateClick(event.start);

    // open the TimeRegistrationForm with the values of the selected event
    const registration = events.find((r) => r.id === event.id);
    if (registration) {
      onAddRegistration({
        id: registration.id,
        date: registration.start,
        startTime: registration.start,
        endTime: registration.end,
        description: registration.title,
      });
    }
  };

  const handleViewChange = (view: string, startDate?: Date, endDate?: Date) => {
    onViewChange(view as View, startDate, endDate);
  };

  return (
    <BigCalendar<Event, Views>
      localizer={localizer}
      defaultDate={selectedDate}
      defaultView={Views.WEEK}
      events={events}
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      onView={handleViewChange}
      eventPropGetter={(event: Event) => ({
        style: {
          backgroundColor: event.id === selectedDate.toString() ? 'blue' : 'red', // added style to highlight selected event
        },
      })}
    />
  );
};