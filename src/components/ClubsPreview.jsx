import { useContext, useEffect, useState } from "react";
import { ClubsContext } from "../context/ClubsContext";
import "../styles/clubs-preview.css";

const ClubsPreview = () => {
  const { clubs, getClubs } = useContext(ClubsContext);

  const [searchInput, setSearchInput] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    getClubs();
  }, []);

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

  return (
    <section className="clubspreview">
      <form
        className="clubspreview__filter"
        onSubmit={(e) => e.preventDefault()}
      >
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
          <div className="clubspreview__card" key={club.id}>
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
