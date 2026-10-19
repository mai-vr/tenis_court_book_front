import { useContext, useState } from "react";
import { ClubsContext } from "../context/ClubsContext";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const { setDateInput } = useContext(ClubsContext);
  const [error, setError] = useState(false);

  const handleDateInput = (e) => {
    const date = e.target.value;

    const tzOffset = new Date().getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - tzOffset)
      .toISOString()
      .split("T")[0];

    if (date < currentDate) {
      setError(true);
      return;
    }

    setError(false);
    setDateInput(date);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/clubs");
  };

  return (
    <>
      <section className="home">
        <h1 className="home__title">Tenis courts</h1>
        <p className="home__subtitle">Today is a nice day to play</p>
        <div className="home__search">
          <form className="home__form" onSubmit={handleFormSubmit}>
            <label htmlFor="date" className="home__label">
              Enter a date
            </label>
            <input
              className="home__input"
              type="date"
              name="date"
              placeholder="Enter a date..."
              onChange={handleDateInput}
            />
            <button disabled={error} className="home__button">
              Search
            </button>
          </form>
          {error && <p className="home__error">Invalid date</p>}
        </div>
      </section>
    </>
  );
};

export { Home };
