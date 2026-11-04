const ReservationSuccess = ({ reservationData, clubName, onReset }) => {
  const { current_date, start_time, end_time, court, payment, status } =
    reservationData;

  const formatTimeStr = (timeString) => {
    if (!timeString) return "";
    return timeString.includes("T")
      ? timeString.split("T")[1].substring(0, 5)
      : timeString;
  };

  return (
    <section className="reservationsuccess">
      <h2 className="reservationsuccess__title">
        Reservation made successfully
      </h2>
      <div className="reservationsuccess__data">
        <p className="reservationsuccess__club">Club: {clubName}</p>
        <p className="reservationsuccess__date">Date: {current_date}</p>
        <p className="reservationsuccess__time">
          Time: {formatTimeStr(start_time)} - {formatTimeStr(end_time)}
        </p>
        <p className="reservationsuccess__total">Total: ${payment?.total}</p>
      </div>
      <a className="reservationsuccess__back__btn" href="/clubs">
        Go back to clubs
      </a>
    </section>
  );
};

export { ReservationSuccess };
