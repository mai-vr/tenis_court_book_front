import { useContext, useEffect } from "react";
import { ClubsContext } from "../context/ClubsContext";
import { useParams } from "react-router-dom";
import "../styles/one-club.css";

const OneClub = () => {
  const { getAClub, selectedClub, getCourts, courts } =
    useContext(ClubsContext);
  const { id } = useParams();

  useEffect(() => {
    getAClub(id);
    getCourts(id);
  }, [id]);

  if (!selectedClub || !selectedClub.location) {
    return <p>Loading club...</p>;
  }

  return (
    <>
      <section className="oneclub">
        <div className="oneclub__logo">
          <img
            src={`${selectedClub.logo_url}`}
            alt={`${selectedClub.name} logo`}
          />
        </div>
        <div className="oneclub__info">
          <h1 className="oneclub__title">{selectedClub.name}</h1>
          <p className="oneclub__subtitle">
            {selectedClub.location.street} {selectedClub.location.number} |
            {selectedClub.location.city}
          </p>
          <p className="oneclub__description">{selectedClub.description}</p>
          <div className="oneclub__contact">
            <p>Phone: {selectedClub.phone ? selectedClub.phone : "No phone"}</p>
            <p>Email: {selectedClub.email ? selectedClub.email : "No email"}</p>
          </div>
          <a href="/reservations" className="oneclub__book__btn">
            Book
          </a>
          <h2 className="oneclub__subtitle__courts">Courts</h2>
          <p className="oneclub__info__courts">
            Know all the courts that {selectedClub.name} has
          </p>
          <div className="oneclub__courts">
            {courts.map((m) => (
              <div className="oneclub__onecourt">
                <h3 className="oneclub__onecourt__title">{m.description}</h3>
                <p className="oneclub__onecourt__material">
                  Material: {m.material}
                </p>
                <p className="oneclub__onecourt__indoor">
                  {m.indoor ? "Indoor" : "Outdoor"}
                </p>
                <p className="oneclub__onecourt__status">{m.status}</p>
                <p className="oneclub__onecourt__price">
                  Price: ${m.price_per_hour}
                </p>
              </div>
            ))}
          </div>
          <div className="oneclub__map">
            <div className="oneclub__map">
              <h2 className="oneclub__subtitle__map">Meet the club</h2>
              <p className="oneclub__info__map">
                Meet the club and book a court to play there
              </p>
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${selectedClub.location.street} ${selectedClub.location.number}, ${selectedClub.location.city}`,
                )}&output=embed`}
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Location of ${selectedClub.name}`}
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { OneClub };
