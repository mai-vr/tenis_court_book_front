import { useState } from "react";

const ReservationForm = ({ selectedSlot, onBack, onConfirm, loading }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const handleConfirm = (court) => {
    onConfirm(court, paymentMethod);
  };

  return (
    <section className="reservationform">
      <div className="reservationform__back">
        <button onClick={onBack} className="reservationform__btn__back">
          Back
        </button>
      </div>
      <div className="reservationform__courts">
        {selectedSlot.available_courts.map((c) => (
          <div key={c.id} className="reservationform__court__card">
            <h3 className="reservationform__title">{c.description}</h3>
            <p className="reservationform__surface">Surface: {c.surface}</p>
            <p className="reservationform__price">
              Price per hour: {c.price_per_hour}
            </p>
            <div className="reservationform__payment">
              <label htmlFor="payment-method">Choose a payment method:</label>

              <select
                id="payment-method"
                value={paymentMethod}
                className="payment__options"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="">Select a payment method</option>
                <option value="cash">Cash</option>
                <option value="qr">QR</option>
                <option value="mercado_pago">Mercado Pago</option>
              </select>
            </div>

            <button
              className="reservationform__btn"
              onClick={() => handleConfirm(c)}
              disabled={!paymentMethod || loading}
            >
              Book this court
            </button>
          </div>
        ))}
      </div>
      {loading && <p className="loading">Loading...</p>}
    </section>
  );
};

export { ReservationForm };
