import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import './CalendarPicker.css';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPicker({ selectedDate, onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1)); // July 2026

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (dayNumber) => {
    const formatted = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
    onSelectDate(formatted);
  };

  const calendarCells = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`blank-${i}`} className="cal-day cal-day--disabled" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const isSelected = selectedDate === formattedDate;
    const isToday = day === 26 && month === 6 && year === 2026;

    calendarCells.push(
      <button
        key={`day-${day}`}
        type="button"
        className={`cal-day ${isSelected ? 'cal-day--selected' : ''} ${isToday ? 'cal-day--today' : ''}`}
        onClick={() => handleDateClick(day)}
      >
        <span>{day}</span>
      </button>
    );
  }

  return (
    <div className="calendar-panel-box">
      <div className="cal-header">
        <button type="button" className="cal-nav-btn" onClick={handlePrevMonth} aria-label="Previous month">
          <ChevronLeft size={18} />
        </button>
        <div className="cal-month-year">
          <CalendarIcon size={16} className="text-orange" />
          <span>{MONTH_NAMES[month]} {year}</span>
        </div>
        <button type="button" className="cal-nav-btn" onClick={handleNextMonth} aria-label="Next month">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="cal-weekdays">
        {WEEKDAYS.map((wd) => (
          <span key={wd}>{wd}</span>
        ))}
      </div>

      <div className="cal-days-grid">
        {calendarCells}
      </div>

      {selectedDate && (
        <div className="cal-selected-bar">
          <span>SELECTED SHOOT DATE:</span>
          <strong>{selectedDate}</strong>
        </div>
      )}
    </div>
  );
}
