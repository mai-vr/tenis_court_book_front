import { useContext, useEffect, useState } from "react";
import { ClubsContext } from "../context/ClubsContext";
import "../styles/slots.css";

const AvailableSlots = ({ onSelectSlot }) => {
  const {
    selectedClub,
    courtsByClub,
    getCourts,
    reservationsByClub,
    getReservationsOneClub,
    dateInput,
    loading,
    error,
  } = useContext(ClubsContext);
  // const [notSlots, setNotSlots] = useState(false);
  const [slots, setSlots] = useState([]);
  const loadingComponent = loading.courts || loading.reservations;
  const errorComponent = error.courts || error.reservations;

  useEffect(() => {
    if (!selectedClub?.id) return;

    if (!courtsByClub[selectedClub.id]) {
      getCourts(selectedClub.id);
    }
    if (!reservationsByClub[selectedClub.id]) {
      getReservationsOneClub(selectedClub.id);
    }
  }, [selectedClub]);

  useEffect(() => {
    if (!selectedClub?.id) return;

    const clubsCourts = courtsByClub[selectedClub.id] || [];
    const clubsReservations = reservationsByClub[selectedClub.id] || [];

    bookingSlots(clubsCourts, clubsReservations);
  }, [selectedClub, courtsByClub, reservationsByClub, dateInput]);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (date) => {
    if (!date) return "";
    return String(date).split("T")[0];
  };

  const formatTimeStr = (time) => {
    if (!time) return "";

    const value = String(time);

    if (value.includes("T")) {
      return value.split("T")[1].substring(0, 5);
    }

    return value.substring(0, 5);
  };

  const bookingSlots = (clubsCourts, clubsReservations) => {
    const schedules = selectedClub.schedules;

    if (!schedules?.length || !dateInput) {
      setSlots([]);
      setNotSlots(true);
      return;
    }

    const clubSlots = [];
    const selectedDate = new Date(`${dateInput}T00:00:00`);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const isToday = selectedDate.getTime() === today.getTime();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const daysOfWeek = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const selectedDay = daysOfWeek[selectedDate.getDay()];

    // Find the date in the 'schedules' atribute of clubs from DB.
    const selectedSchedule = schedules.find((s) => s.day_week === selectedDay);

    if (!selectedSchedule) {
      setSlots([]);
      setNotSlots(true);
      return;
    }

    const getMinutes = (timeString) => {
      const time = timeString.includes("T")
        ? timeString.split("T")[1]
        : timeString;

      const [hours, minutes] = time.split(":").map(Number);

      return hours * 60 + minutes;
    };

    const formatMinutes = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    let current = getMinutes(selectedSchedule.start_time);
    const end = getMinutes(selectedSchedule.end_time);

    while (current + 60 <= end) {
      const startTime = formatMinutes(current);
      const endTime = formatMinutes(current + 60);
      if (isToday && current <= currentMinutes) {
        current += 60;
        continue;
      }

      const availableCourts = clubsCourts
        .filter((c) => c.status === "available")
        .filter((c) => {
          const hasReservation = clubsReservations.some((r) => {
            const sameCourt = Number(r.court_id) === Number(c.id);
            const sameDate = formatDate(r.current_date) === dateInput;

            const reservationStart = formatTimeStr(r.start_time);
            const reservationEnd = formatTimeStr(r.end_time);

            const overlaps =
              reservationStart < endTime && reservationEnd > startTime;

            return sameCourt && sameDate && overlaps;
          });

          return !hasReservation;
        });

      clubSlots.push({
        date: dateInput,
        day_week: selectedDay,
        start_time: startTime,
        end_time: endTime,
        available_courts: availableCourts,
        available: availableCourts.length > 0,
      });

      current += 60;
    }

    setSlots(clubSlots);
  };

  const handleClickSlot = (slot) => {
    if (slot.available && onSelectSlot) {
      onSelectSlot(slot);
    }
  };

  if (loadingComponent) {
    return (
      <div className="slots slots__loading">
        <p className="loading slots__message">Loading available slots...</p>
      </div>
    );
  }

  if (errorComponent) {
    return (
      <div className="slots slots__error">
        <p className="error error__banner">{errorComponent}</p>
      </div>
    );
  }

  return (
    <section className="slots">
      {slots.length > 0 ? (
        slots.map((slot) => (
          <div className="slots__card" key={`${slot.date}-${slot.start_time}`}>
            <p className="slots__time">
              {slot.start_time} - {slot.end_time}
            </p>

            <p className="slots__text">
              Available courts: {slot.available_courts.length}
            </p>
            {slot.available_courts.length > 0 ? (
              <button
                type="button"
                className="slots__btn"
                disabled={!slot.available}
                onClick={() => handleClickSlot(slot)}
              >
                Book
              </button>
            ) : (
              <p className="slots__nocourts">No courts available</p>
            )}
          </div>
        ))
      ) : (
        <p className="slots__message">There are not schedule for this date.</p>
      )}
    </section>
  );
};

export { AvailableSlots };
