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
  } = useContext(ClubsContext);

  const [step, setStep] = useState("slots");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [createdReservation, setCreatedReservation] = useState(null);

  useEffect(() => {
    if (id) {
      getAClub(id);
    }
  }, [id]);

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    setStep("form");
    setErrorMsg(null);
  };

  const handleConfirmReservation = async (selectedCourt) => {
    setLoading(true);
    setErrorMsg(null);

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
      console.error("Detalle del error al reservar:", err);

      const errorPayload = err.response?.data || err;
      const message =
        errorPayload.errors?.join(", ") ||
        errorPayload.error ||
        errorPayload.message ||
        err.message ||
        "Ocurrió un error al crear la reserva.";

      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reservation">
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
            />
          </div>
        </>
      )}

      {errorMsg && <div className="error-banner">{errorMsg}</div>}

      {step === "slots" && <AvailableSlots onSelectSlot={handleSelectSlot} />}

      {step === "form" && selectedSlot && (
        <ReservationForm
          selectedSlot={selectedSlot}
          loading={loading}
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
          }}
        />
      )}
    </div>
  );
};
