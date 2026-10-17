import { useContext, useEffect, useState } from "react";
import { ClubsContext } from "../context/ClubsContext";
import "../styles/clubs-preview.css";
import { useNavigate } from "react-router-dom";

const ClubsPreview = () => {
  const {
    clubs,
    getClubs,
    dateInput,
    setDateInput,
    getReservations,
    reservationsByClub,
    getCourts,
    courtsByClub,
    getReservationsOneClub,
  } = useContext(ClubsContext);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    getClubs();
  }, []);

  useEffect(() => {
    if (!dateInput || !clubs?.length) return;

    clubs.forEach((club) => {
      getCourts(club.id);
      getReservationsOneClub(club.id);
    });
  }, [dateInput, clubs]);

  console.log("Canchas por club:", courtsByClub);
  console.log("Reservas por club:", reservationsByClub);

  const filteredClubs = clubs?.filter((club) => {
    const matchesName = club.name
      .toLowerCase()
      .includes(searchInput.trim().toLowerCase());

    const matchesCity =
      selectedCity === "" || club.location.city === selectedCity;

    return matchesName && matchesCity;
  });

  const cities = [
    ...new Set(clubs?.map((club) => club.location.city) || []),
  ].sort();

  const handleClickClub = (id) => {
    navigate(`/clubs/${id}`);
  };

  return (
    <section className="clubspreview">
      <form
        className="clubspreview__filter"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="date"
          name="date-search"
          placeholder="Enter a date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <input
          type="text"
          name="clubs-search"
          placeholder="Search by club name"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <select
          name="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">All cities</option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </form>

      {filteredClubs?.length > 0 ? (
        filteredClubs.map((club) => (
          <div
            className="clubspreview__card"
            key={club.id}
            onClick={() => handleClickClub(club.id)}
          >
            <img
              src={club.logo_url}
              alt={`Logo of ${club.name}`}
              className="clubspreview__logo"
            />

            <h2 className="clubspreview__title">{club.name}</h2>

            <p className="clubspreview__subtitle">
              {club.location.street} {club.location.number} |{" "}
              {club.location.city}
            </p>

            <a href={`/clubs/${club.id}`} className="clubspreview__book__btn">
              Book
            </a>
          </div>
        ))
      ) : (
        <p>No clubs found</p>
      )}
    </section>
  );
};

export { ClubsPreview };
