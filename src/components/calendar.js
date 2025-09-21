import React, { useState, useEffect, useMemo } from "react";

const monthsArr = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Calendar({ googleToken }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [events, setEvents] = useState({});
  const [eventText, setEventText] = useState("");

  // Generate calendar days (max 5 rows = 35 cells)
  const calendarDays = useMemo(() => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    // Fill up to 42 (6 rows)
    while (days.length < 42) days.push(null);

    // Collapse to 5 rows if we have 6
    if (days.length === 42) {
      const firstRow = days.slice(0, 7);
      const lastRow = days.slice(35, 42);

      let merged = [...firstRow];
      let lastRowIdx = 0;
      for (let i = 0; i < merged.length; i++) {
        if (merged[i] === null && lastRowIdx < lastRow.length) {
          merged[i] = lastRow[lastRowIdx++];
        }
      }

      // Only keep 5 rows = 35 cells
      days = [...merged, ...days.slice(7, 35)];
    }

    return days;
  }, [month, year]);

  // Fetch Google Calendar events
  useEffect(() => {
    if (!googleToken) return;

    const fetchEvents = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${year}-${String(
            month + 1
          ).padStart(2, "0")}-01T00:00:00Z&timeMax=${year}-${String(
            month + 1
          ).padStart(2, "0")}-31T23:59:59Z`,
          { headers: { Authorization: `Bearer ${googleToken}` } }
        );
        const data = await res.json();
        if (!data.items) return;

        const newEvents = {};
        data.items.forEach((evt) => {
          const evtDate =
            evt.start?.date ||
            (evt.start?.dateTime &&
              evt.start.dateTime.slice(0, 10).split("-")[2]);
          if (evtDate) {
            const key = `${year}-${month + 1}-${parseInt(evtDate, 10)}`;
            if (!newEvents[key]) newEvents[key] = [];
            newEvents[key].push(evt.summary);
          }
        });
        setEvents(newEvents);
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };

    fetchEvents();
  }, [googleToken, month, year]);

  // Reset selected date on month/year change
  useEffect(() => {
    const isCurrentMonth =
      month === today.getMonth() && year === today.getFullYear();
    setSelectedDate(isCurrentMonth ? today.getDate() : 1);
    setEventText("");
  }, [month, year]);

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else {
      setMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else {
      setMonth((prev) => prev + 1);
    }
  };

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setEventText("");
  };

  const selectedKey = selectedDate
    ? `${year}-${month + 1}-${selectedDate}`
    : null;

  // Save event to Google Calendar
  const handleEventSave = async () => {
    if (!selectedDate || !eventText.trim() || !googleToken) return;

    const event = {
      summary: eventText,
      start: {
        date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
          selectedDate
        ).padStart(2, "0")}`,
      },
      end: {
        date: `${year}-${String(month + 1).padStart(2, "0")}-${String(
          selectedDate+1
        ).padStart(2, "0")}`,
      },
    };

    try {
      await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${googleToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );
      setEventText("");

      // Refresh events
      setTimeout(async () => {
        try {
          const res = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${year}-${String(
              month + 1
            ).padStart(2, "0")}-01T00:00:00Z&timeMax=${year}-${String(
              month + 1
            ).padStart(2, "0")}-31T23:59:59Z`,
            { headers: { Authorization: `Bearer ${googleToken}` } }
          );
          const data = await res.json();
          if (!data.items) return;
          const newEvents = {};
          data.items.forEach((evt) => {
            const evtDate =
              evt.start?.date ||
              (evt.start?.dateTime &&
                evt.start.dateTime.slice(0, 10).split("-")[2]);
            if (evtDate) {
              const key = `${year}-${month + 1}-${parseInt(evtDate, 10)}`;
              if (!newEvents[key]) newEvents[key] = [];
              newEvents[key].push(evt.summary);
            }
          });
          setEvents(newEvents);
        } catch (err) {
          console.error("Failed to refresh events", err);
        }
      }, 500);
    } catch (err) {
      console.error("Failed to save event", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100%" }}>
      {/* Left Calendar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          borderRight: "1px solid #000",
          boxSizing: "border-box",
        }}
      >
        {/* Header with navigation */}
        <div
          style={{
            backgroundColor: "#ff6f61",
            height: "20%",
            borderTopLeftRadius: "2vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 12px",
            color: "white",
          }}
        >
          <button
            style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
            onClick={handlePrevMonth}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff">
              <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
            </svg>
          </button>

          {monthsArr[month]} {year}

          <button
            style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}
            onClick={handleNextMonth}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff">
              <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
            </svg>
          </button>
        </div>

        {/* Calendar grid */}
        <table
          style={{
            alignSelf: "center",
            justifySelf: "center",
            width: "90%",
            marginTop: 10,
            tableLayout: "fixed",
            flexGrow: 1,
          }}
        >
          <thead>
            <tr>
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <th key={day} style={{ fontWeight: "bold", fontSize: "13px" }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, weekIdx) => (
              <tr key={weekIdx}>
                {calendarDays
                  .slice(weekIdx * 7, weekIdx * 7 + 7)
                  .map((date, idx) => {
                    const isToday =
                      date === today.getDate() &&
                      month === today.getMonth() &&
                      year === today.getFullYear();
                    const isSelected = date === selectedDate;
                    const eventKey = date ? `${year}-${month + 1}-${date}` : null;
                    const hasEvents =
                      eventKey && events[eventKey] && events[eventKey].length > 0;
                    return (
                      <td
                        key={idx}
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          border: "none",
                        }}
                      >
                        <div
                          onClick={() => handleDateClick(date)}
                          style={{
                            width: "3vh",
                            height: "3vh",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "1vh",
                            background: isSelected
                              ? "#ff9f96ff"
                              : isToday
                              ? "#ff9f9671"
                              : hasEvents
                              ? "#ff6f61"
                              : undefined,
                            color: hasEvents || isSelected ? "white" : "#333",
                            cursor: date ? "pointer" : "default",
                            border: isSelected
                              ? "2px solid #ff6f61"
                              : "1px solid #ccc",
                            fontWeight: isToday ? "bold" : "normal",
                          }}
                        >
                          {date || ""}
                        </div>
                      </td>
                    );
                  })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Right Events Panel */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          backgroundColor: "#ff6f61",
          borderTopRightRadius: "2vh",
          borderBottomRightRadius: "2vh",
          alignItems: "center",
          paddingTop: "2vh",
          maxHeight: "100%",
          overflowY: "auto",
        }}
      >
        <p style={{ color: "white", margin: "0", fontSize: "15px", fontWeight: "bold" }}>
          {selectedDate} {monthsArr[month]} {year}
        </p>
        <div style={{ width: "90%", marginTop: "10px" }}>
          <input
            type="text"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
            placeholder="Event name"
            style={{
              width: "70%",
              marginTop: 8,
              marginBottom: 8,
              padding: "6px 12px",
              borderRadius: "12px",
              border: "none",
              outline: "none",
              fontSize: "15px",
            }}
          />
          <button
            onClick={handleEventSave}
            style={{
              borderRadius: "50%",
              border: "none",
              background: "transparent",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            +
          </button>
        </div>
        {events[selectedKey] && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            {events[selectedKey].map((evt, idx) => (
              <div
                key={idx}
                style={{
                  background: "#fff",
                  color: "#ff6f61",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  width: "100%",
                  fontSize: "14px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <span style={{ flex: 1 }}>
                  {evt.length > 20 ? evt.slice(0, 20) + "..." : evt}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
