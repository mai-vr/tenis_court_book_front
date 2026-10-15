import { useContext } from "react";
import { ClubsContext } from "../context/ClubsContext";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { Header } from "../components/Header";

const Home = () => {
  const navigate = useNavigate();
  const { setDateInput } = useContext(ClubsContext);

  const handleDateInput = (e) => {
    setDateInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/clubs");
  };

  return (
    <>
      <Header />
      <section className="home">
        <h1 className="home__title">Tenis courts</h1>
        <p className="home__subtitle">Today is a nice day to play</p>
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
          <button className="home__button">Search</button>
        </form>
      </section>
    </>
  );
};

export { Home };
