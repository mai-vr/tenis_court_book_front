import { useContext, useState } from "react";
import { ClubsContext } from "../context/ClubsContext";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { ERRORS } from "../services/errorMessagges";

const Home = () => {
  const navigate = useNavigate();
  const { dateInput, setDateInput } = useContext(ClubsContext);
  const [errorComponent, setErrorComponent] = useState(null);

  const handleDateInput = (e) => {
    const date = e.target.value;

    const tzOffset = new Date().getTimezoneOffset() * 60000;
    const currentDate = new Date(Date.now() - tzOffset)
      .toISOString()
      .split("T")[0];

    if (date < currentDate) {
      setError(ERRORS.wrongDate);
      return;
    }

    // setError(false);
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
              value={dateInput}
              onChange={handleDateInput}
            />
            <button disabled={errorComponent} className="home__button">
              Search
            </button>
          </form>
          {errorComponent && <p className="home__error">{errorComponent}</p>}
        </div>
      </section>
    </>
  );
};

export { Home };
