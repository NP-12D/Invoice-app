import { useState } from "react";
import styled from "styled-components";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CustomDatePicker({ selectedDate, onSelectDate, show, setShow, datePickerRef }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDayIndex = new Date(year, month, 1).getDay();
    const adjustedFirst = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
    
    const totalDays = new Date(year, month + 1, 0).getDate();
    const prevMonthTotalDays = new Date(year, month, 0).getDate();
    
    const days = [];

    for (let i = adjustedFirst - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false
      });
    }

    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const changeMonth = (dir) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  };

  const handleDayClick = (day) => {
    const yyyy = day.getFullYear();
    const mm = String(day.getMonth() + 1).padStart(2, "0");
    const dd = String(day.getDate()).padStart(2, "0");
    onSelectDate(`${yyyy}-${mm}-${dd}`);
    setShow(false);
  };

  const formatDisplay = (dateStr) => {
    if (!dateStr) return "Select Date";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Select Date"; 
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  return (
    <Wrapper ref={datePickerRef}>
      <FieldLabel>Invoice Date</FieldLabel>
      <Trigger type="button" $active={show} onClick={() => setShow(!show)}>
        <span>{formatDisplay(selectedDate)}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C5DFA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </Trigger>

      {show && (
        <CalendarDropdown>
          <CalendarHeader>
            <NavBtn type="button" onClick={() => changeMonth(-1)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C5DFA" strokeWidth="3">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </NavBtn>
            <span>{MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}</span>
            <NavBtn type="button" onClick={() => changeMonth(1)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7C5DFA" strokeWidth="3">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </NavBtn>
          </CalendarHeader>

          <DaysGrid>
            {getCalendarDays(currentMonth).map(({ date, isCurrentMonth }, idx) => {
              const isToday = new Date().toDateString() === date.toDateString();
              const dateKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
              const isSelected = selectedDate === dateKey;
              
              return (
                <DayBtn
                  key={`day-${dateKey}-${idx}`}
                  type="button"
                  $today={isToday}
                  $selected={isSelected}
                  $isCurrentMonth={isCurrentMonth}
                  onClick={() => handleDayClick(date)}
                >
                  {date.getDate()}
                </DayBtn>
              );
            })}
          </DaysGrid>
        </CalendarDropdown>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const FieldLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.secondaryText};
  letter-spacing: -0.1px;
  font-family: inherit;
`;

const Trigger = styled.button`
  height: 48px;
  background-color: ${({ theme }) => theme.inputBg || theme.card};
  border: 1px solid ${({ $active, theme }) => ($active ? "#7C5DFA" : theme.border)};
  border-radius: 4px;
  padding: 0 20px;
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  font-weight: 700; 
  outline: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  width: 100%;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:hover { 
    border-color: #7C5DFA; 
  }
`;

const CalendarDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  min-width: 240px;
  background-color: ${({ theme }) => theme.card}; 
  border-radius: 8px;
  padding: 24px 16px;
  z-index: 1000;
  box-shadow: 0px 10px 20px rgba(72, 84, 159, 0.25); 
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.border};
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 13px;
  letter-spacing: -0.25px;
  margin-bottom: 24px;
  user-select: none;
`;

const NavBtn = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;
  
  &:hover {
    svg { stroke: #9277ff; }
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 16px;
  column-gap: 12px;
  text-align: center;
`;

const DayBtn = styled.button`
  background: transparent;
  border: none;
  height: 24px;
  width: 100%;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  transition: color 0.2s ease;

  color: ${({ $selected, $today, $isCurrentMonth, theme }) => {
    if ($selected || $today) return "#7C5DFA";
    if (!$isCurrentMonth) return theme.darkBlack || "#61647D";
    return theme.text;
  }};

  opacity: ${({ $selected, $today, $isCurrentMonth }) => 
    $selected || $today || $isCurrentMonth ? "1" : "0.6"
  };

  &:hover {
    color: #7C5DFA;
    opacity: 1;
  }
`;