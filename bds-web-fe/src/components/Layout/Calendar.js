import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

// Localizer setup using moment.js
const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const events = [
    {
      title: "Meeting 1",
      start: new Date(2023, 11, 2, 10, 0),
      end: new Date(2023, 11, 2, 12, 0),
    },
    {
      title: "Meeting 2",
      start: new Date(2023, 11, 3, 14, 0),
      end: new Date(2023, 11, 3, 16, 0),
    },
    // Add more events as needed
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }} // Set the calendar height
      />
    </div>
  );
};

export default MyCalendar;
