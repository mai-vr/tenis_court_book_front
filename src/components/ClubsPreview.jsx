import { useContext, useEffect } from "react";
import { ClubsContext } from "../context/ClubsContext";

const ClubsPreview = () => {
  const { clubs, getClubs } = useContext(ClubsContext);

  useEffect(() => {
    getClubs();
  }, []);

  return (
    <section className="clubspreview">
      {clubs ? (
        clubs.map((m) => (
          <div className="clubspreview__card">
            <img
              src={m.logo_url}
              alt="clubs logo"
              className="clubspreview__logo"
            />
            <h2 className="clubspreview__title">{m.name}</h2>
            <p className="clubspreview__subtitle">
              {m.location.street} {m.location.number} | {m.location.city}
            </p>
            <a href={`/clubs/${m.id}`} className="clubspreview__book__btn">
              Book
            </a>
          </div>
        ))
      ) : (
        <p>Could not find clubs</p>
      )}
    </section>
  );
};

export { ClubsPreview };
