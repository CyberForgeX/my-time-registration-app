import React, { useState } from "react";
import moment from "moment";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  View,
  Views,
  DateLocalizer,
  SlotInfo,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  date: Date;
}

interface CalendarProps {
  selectedDate: Date;
  onDateClick: (date: Date) => void;
  events: Event[];
  onViewChange: (view: View, startDate?: Date, endDate?: Date) => void;
}

const localizer: DateLocalizer<moment.Moment> = momentLocalizer(moment);

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateClick,
  events,
  onViewChange,
}) => {
  const handleSelectSlot = ({ start }: SlotInfo) => {
    const newEvent: Event = {
      id: Date.now(),
      title: "New event",
      start,
      end: moment(start).add(1, 'hour').toDate(),
      date: start, // add the date property with the value of start
    };
    onDateClick(start);
    setCalendarEvents([...events, newEvent]);
  };


  const handleSelectEvent = (event: Event) => {
    onDateClick(event.start);
  };

  const [calendarEvents, setCalendarEvents] = useState<Event[]>(events);

  return (
    <BigCalendar<Event, typeof View>
      localizer={localizer}
      defaultDate={selectedDate}
      defaultView={Views.WEEK}
      events={calendarEvents} // use calendarEvents instead of events
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      onView={(view, startDate, endDate) => onViewChange(view, startDate, endDate)}
    />  );
};

export default Calendar;
