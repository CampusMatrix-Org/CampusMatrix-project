

import React, { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);
const DndCalendar = withDragAndDrop(Calendar);


const CalendarPage = ({ tasks, onEventDrop }) => {
  
  const [view, setView] = useState('month');
  
  const [calendarEvents, setCalendarEvents] = useState([]);

  
  useEffect(() => {
    const formattedEvents = tasks
      
      .filter(task => !task.isCompleted && task.dueDateValue instanceof Date && !isNaN(task.dueDateValue)) 
      .map(task => ({
        id: task.id, 
        title: task.title,
        start: task.dueDateValue, 
        
        end: new Date(task.dueDateValue.getTime() + 60 * 60 * 1000), 
        allDay: true, 
      }));
    setCalendarEvents(formattedEvents);
  }, [tasks]); 


  const eventPropGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#6D28D9', 
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block' 
    };
    return { style: style };
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Calendar</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 p-1 rounded-full bg-gray-200">
          </div>
          <button className="flex items-center bg-white text-gray-700 px-4 py-2 rounded-lg shadow-sm border border-gray-300 text-sm font-semibold hover:bg-gray-50">
            <Upload className="w-4 h-4 mr-2" />
            Sync with Google Calendar
          </button>
        </div>
      </div>
      
      <div className="h-[800px] bg-white p-4 rounded-lg shadow">
        <DndCalendar
          localizer={localizer}
          events={calendarEvents} 
          onEventDrop={onEventDrop} 
          view={view}
          onView={setView}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date()} 
          draggableAccessor={() => true}
          resizable={false}
          selectable
          eventPropGetter={eventPropGetter}
        />
      </div>
    </div>
  );
};

export default CalendarPage;