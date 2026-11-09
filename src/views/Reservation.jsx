import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ClubsContext } from "../context/ClubsContext";
import { reservation as createReservationApi } from "../services/clubsApi";
import { AvailableSlots } from "../components/AvailableSlots";
import { ReservationForm } from "../components/ReservationForm";
import { ReservationSuccess } from "../components/ReservationSuccess";
import "../styles/slots.css";

export const Reservation = () => {
  const { id } = useParams();
  const {
    selectedClub,
    getAClub,
    getReservationsOneClub,
    dateInput,
    setDateInput,
    error,
    loading,
  } = useContext(ClubsContext);

  const [step, setStep] = useState("slots");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingComponent, setLoadingComponent] = useState(false);
  const [errorComponent, setErrorComponent] = useState(null);
  const [createdReservation, setCreatedReservation] = useState(null);

  useEffect(() => {
    if (id) {
      getAClub(id);
    }
  }, [id]);

  useEffect(() => {
    if (error.selectedClub) {
      setErrorComponent(error.selectedClub);
    }
  }, [error.selectedClub]);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setStep("form");
    setErrorComponent(null);
  };

  const handleConfirmReservation = async (selectedCourt) => {
    setLoadingComponent(true);
    setErrorComponent(null);

    try {
      const reservationData = {
        payment_method: "cash",
        reservation: {
          court_id: Number(selectedCourt.id),
          current_date: selectedSlot.date,
          start_time: selectedSlot.start_time,
          end_time: selectedSlot.end_time,
        },
      };

      const response = await createReservationApi(
        selectedClub.id,
        reservationData,
      );

      const responseData = response.data ? response.data : response;

      setCreatedReservation(responseData.reservation);
      setStep("success");

      getReservationsOneClub(selectedClub.id);
    } catch (err) {
      console.error("Reservation details:", err);

      const errorPayload = err.response?.data || err;
      const message =
        errorPayload.errors?.join(", ") ||
        errorPayload.error ||
        errorPayload.message ||
        err.message ||
        "Could not make the reservation.";

      setErrorComponent(message);
    } finally {
      setLoadingComponent(false);
    }
  };

  if (loading.selectedClub) {
    return (
      <div className="reservation reservation__loading">
        <p className="loading">Loading club details...</p>
      </div>
    );
  }

  return (
    <div className="reservation">
      {errorComponent && (
        <div className="reservation__errorbanner">{errorComponent}</div>
      )}
      {step === "slots" && (
        <>
          <h1 className="reservation__title">Book your Court</h1>

          <div className="reservation__datefilter__container">
            <label htmlFor="reservation-date">Select date:</label>

            <input
              className="reservation__input"
              id="reservation-date"
              type="date"
              value={dateInput || ""}
              onChange={(e) => setDateInput(e.target.value)}
              disabled={loadingComponent}
            />
          </div>
        </>
      )}

      {step === "slots" && <AvailableSlots onSelectSlot={handleSelectSlot} />}

      {step === "form" && selectedSlot && (
        <ReservationForm
          selectedSlot={selectedSlot}
          loading={loadingComponent}
          onBack={() => setStep("slots")}
          onConfirm={handleConfirmReservation}
        />
      )}

      {step === "success" && createdReservation && (
        <ReservationSuccess
          reservationData={createdReservation}
          clubName={selectedClub?.name}
          onReset={() => {
            setStep("slots");
            setSelectedSlot(null);
            setCreatedReservation(null);
            setErrorComponent(null);
          }}
        />
      )}
    </div>
  );
};
