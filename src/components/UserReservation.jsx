import { useContext, useEffect, useState } from "react";
import { ClubsContext } from "../context/ClubsContext";

const UserReservation = () => {
  const {
    userReservation,
    loading,
    error,
    getUserReservation,
    deleteUserReservation,
  } = useContext(ClubsContext);

  const [reservationToCancel, setReservationToCancel] = useState(null);

  useEffect(() => {
    getUserReservation();

    const interval = setInterval(() => {
      // Executes a function repeatedly at a specified interval.
      getUserReservation();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleClickCancel = (clubId, reservationId) => {
    setReservationToCancel({ clubId, reservationId });
  };

  const handleConfirmCancel = async () => {
    const { clubId, reservationId } = reservationToCancel;

    const success = await deleteUserReservation(clubId, reservationId);

    if (success) {
      setReservationToCancel(null);
    }
  };

  const handleCloseModal = () => {
    setReservationToCancel(null);
  };

  const formatTime = (time) => {
    if (!time) return "";

    const value = String(time);

    if (value.includes("T")) {
      return value.split("T")[1].substring(0, 5);
    }

    return value.substring(0, 5);
  };

  return (
    <section className="user__reservation">
      {loading.userReservations && (
        <p className="loading user__reservation__message">Loading data...</p>
      )}
      {error.userReservations && (
        <p className="error user__reservation__message user__reservation__message--error">
          {error.userReservations}
        </p>
      )}
      {!loading.userReservations &&
        !error.userReservations &&
        userReservation.length === 0 && (
          <p className="user__reservation__message">
            You don't have any reservations yet.
          </p>
        )}
      {error.deletingReservation && (
        <p className="error user__reservation__message user__reservation__message--error">
          {error.deletingReservation}
        </p>
      )}
      <div className="user__reservations__list">
        {userReservation.map((r) => (
          <div className="user__reservation__card" key={r.id}>
            <h3 className="user__reservation__title">{r.court.description}</h3>
            <p className="user__reservation__subtitle">{r.court.club.name}</p>
            <div className="user__reservation__info">
              <p>
                Location: {r.court.club.location.street},{" "}
                {r.court.club.location.number} |
                {r.court.club.location.city}{" "}
              </p>
              <p>Date: {r.current_date}</p>
              <p>
                From: {formatTime(r.start_time)} - To: {formatTime(r.end_time)}
              </p>

              {r.status === "cancelled" ? (
                <p className="user__reservation__status cancelled">
                  Status: Cancelled
                </p>
              ) : r.status === "pending" ? (
                <p className="user__reservation__status pending">
                  {" "}
                  Status: Pending
                </p>
              ) : (
                <p className="user__reservation__status confirmed">
                  Status: Confirmed
                </p>
              )}
              <p className="user__reservation__price">
                Total: ${r.payment.total}
              </p>
            </div>
            <div className="user__reservation__actions">
              {r.status !== "cancelled" &&
                new Date(`${r.current_date}T00:00:00`) >=
                  new Date(new Date().toDateString()) && (
                  <button
                    onClick={() => handleClickCancel(r.court.club.id, r.id)}
                    className="user__reservation__btn"
                  >
                    Cancel reservation
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      {reservationToCancel && (
        <div className="modal__overlay" onClick={handleCloseModal}>
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="modal-title" className="modal__title">
              Cancel reservation
            </h3>
            <p className="modal__text">
              Are you sure you want to cancel this reservation? This action
              cannot be undone.
            </p>
            <div className="modal__actions">
              <button
                className="modal__btn modal__btn--secondary"
                onClick={handleCloseModal}
              >
                Keep reservation
              </button>
              <button
                className="modal__btn modal__btn--danger"
                onClick={handleConfirmCancel}
              >
                Yes, cancel it
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export { UserReservation };
