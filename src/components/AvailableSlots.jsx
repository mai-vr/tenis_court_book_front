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
  } = useContext(ClubsContext);
  const [notSlots, setNotSlots] = useState(false);
  const [slots, setSlots] = useState([]);

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
    const selectedDate = new Date(`${dateInput}T12:00:00`);
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

  return (
    <section className="slots">
      {slots.length > 0 ? (
        slots.map((slot) => (
          <div className="slots__card" key={`${slot.date}-${slot.start_time}`}>
            <p className="slots__time">
              {slot.start_time} - {slot.end_time}
            </p>

            <p className="slots__text">
              Canchas disponibles: {slot.available_courts.length}
            </p>

            <button
              type="button"
              className="slots__btn"
              disabled={!slot.available}
              onClick={() => handleClickSlot(slot)}
            >
              Reservar
            </button>
          </div>
        ))
      ) : (
        <p className="slots__message">
          No hay horarios disponibles para esta fecha.
        </p>
      )}
    </section>
  );
};

export { AvailableSlots };
