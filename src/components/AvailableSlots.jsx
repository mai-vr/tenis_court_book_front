import { useContext, useEffect, useState } from "react";
import { ClubsContext } from "../context/ClubsContext";

const AvailableSlots = () => {
  const {
    selectedClub,
    dateInput,
    courtsByClub,
    reservationsByClub,
    getCourts,
    getReservationsOneClub,
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
    // The parameters to analyze to know the available sloots are the courts of the club, the date, if it is available and the schedule of the club.
    if (!selectedClub?.schedules || !dateInput) {
      setSlots([]);
      return;
    }

    const courts = courtsByClub[selectedClub.id] || [];
    const reservations = reservationsByClub[selectedClub.id] || [];
    bookingSlots(selectedClub.schedules, dateInput, courts, reservations);
  }, [selectedClub, dateInput, courtsByClub, reservationsByClub]);

  const bookingSlots = (schedule, dateStr, courts, reservations) => {
    const dateObj = new Date(dateStr + "T00:00:00");
    const dayWeek = dateObj.getDay();

    const scheduleDays = schedule.filter((s) => s.day_week === dayWeek);
    if (scheduleDays.length === 0) {
      setNotSlots(true);
      setSlots([]);
      return;
    }

    setNotSlots(false);
    const slotsCalculated = [];

    scheduleDays.forEach((s) => {
      // Date format.
      const startTimeStr = s.start_time.includes("T")
        ? s.start_time.split("T")[1]
        : s.start_time;
      const endTimeStr = s.end_time.includes("T")
        ? s.end_time.split("T")[1]
        : s.end_time;

      let [currentHour, currentMinute] = startTimeStr.split(":").map(Number);
      const [endHour, endMinute] = endTimeStr.split(":").map(Number);

      const scheduleEndInMinutes = endHour * 60 + endMinute;

      while (currentHour * 60 + currentMinute < scheduleEndInMinutes) {
        const startStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`;

        let nextHour = currentHour + 1;
        let nextMinute = currentMinute;
        const endStr = `${String(nextHour).padStart(2, "0")}:${String(nextMinute).padStart(2, "0")}`;

        // The date to book can´t be past than today.
        const todayStr = new Date().toISOString().split("T")[0];
        if (dateStr === todayStr) {
          const now = new Date();
          const slotTimeInMinutes = nextHour * 60 + nextMinute;
          const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
          if (slotTimeInMinutes <= currentTimeInMinutes) {
            currentHour = nextHour;
            currentMinute = nextMinute;
            continue;
          }
        }

        const availableCourts = courts.filter((court) => {
          const isReserved = reservations.some((res) => {
            return (
              res.court_id === court.id &&
              res.current_date === dateStr &&
              res.start_time.includes(startStr) &&
              res.status !== "cancelled"
            );
          });
          return !isReserved;
        });

        slotsCalculated.push({
          day_week: dayWeek,
          start_time: startStr,
          end_time: endStr,
          available_courts: availableCourts,
          available: availableCourts.length > 0,
        });

        currentHour = nextHour;
        currentMinute = nextMinute;
      }
    });
    setSlots(slotsCalculated);
  };

  return (
    <section className="slots">
      {slots.map((m) => (
        <div className="slots__card">
          <p className="slots__time" key={`${m.day_week}-${m.start_time}`}>
            {m.start_time} - {m.end_time}
          </p>
          <p className="slots__status">
            {m.available
              ? `${m.available_courts.length} available courts`
              : "No courts"}
          </p>
        </div>
      ))}
      {notSlots && <p>No courts available</p>}
    </section>
  );
};

export { AvailableSlots };
