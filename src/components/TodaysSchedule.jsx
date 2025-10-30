

import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react'; // Use lucide-react


const allScheduledEvents = [
  { id: 1, date: '2025-10-26', time: '9:00 AM', title: 'Physics Lecture' },
  { id: 2, date: '2025-10-26', time: '2:00 PM', title: 'Study Group' },
  { id: 3, date: '2025-10-27', time: '10:00 AM', title: 'Math Midterm' },
  { id: 4, date: '2025-10-27', time: '1:00 PM', title: 'History Review' },
];


const ScheduleItem = ({ time, title }) => (
  <div className="flex items-center space-x-4">
    <p className="font-semibold text-gray-800 w-28">{time}</p>
    <div className="w-px h-6 bg-gray-300"></div>
    <p className="text-gray-600">{title}</p>
  </div>
);


const TodaysSchedule = () => {
  
  const [displayDate, setDisplayDate] = useState('');
  const [todaysEvents, setTodaysEvents] = useState([]);

  
  useEffect(() => {
    const today = new Date();

    
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions).toUpperCase();
    setDisplayDate(formattedDate);

    
    const offset = today.getTimezoneOffset();
    const todayInLocalTime = new Date(today.getTime() - (offset * 60 * 1000));
    const isoDate = todayInLocalTime.toISOString().split('T')[0];


    const filteredEvents = allScheduledEvents.filter(event => event.date === isoDate);
    setTodaysEvents(filteredEvents);

  }, []);


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full">
      <div className="flex items-center mb-4">
        <CalendarDays className="text-gray-500 mr-3" size={24} strokeWidth={2} />
        <div>
          <h2 className="text-xl font-semibold">Today's Schedule</h2>
          <p className="text-sm text-gray-400">{displayDate}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {todaysEvents.length > 0 ? (
          todaysEvents.map(event => (
            <ScheduleItem key={event.id} time={event.time} title={event.title} />
          ))
        ) : (
          <p className="text-gray-500">No events scheduled for today.</p>
        )}
      </div>
    </div>
  );
};

export default TodaysSchedule;