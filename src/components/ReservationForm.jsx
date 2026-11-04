const ReservationForm = ({ selectedSlot, onBack, onConfirm, loading }) => {
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
            <button
              className="reservationform__btn"
              onClick={() => onConfirm(c)}
            >
              {loading ? "Loading" : "Book this court"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export { ReservationForm };
