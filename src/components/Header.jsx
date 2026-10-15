import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/header.css";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="header">
      <nav className="header__nav">
        <div className="header__title__logo">
          <a href="/" className="header__nav__link">
            <svg
              className="header__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="#f6f5ef"
                d="M512 1024q-139 0-257-68.5T68.5 769T0 512q139 0 257-68.5T443.5 257T512 0q139 0 257 68.5T955.5 255t68.5 257q-139 0-257 68.5T580.5 767T512 1024M4 448q22-174 146-298T448 4q-1 120-60.5 222T226 387.5T4 448m1016 128q-22 174-146 298t-298 146q1-120 60.5-222T798 636.5t222-60.5"
              />
            </svg>
            <h3 className="header__title">Tennis courts</h3>
          </a>
        </div>
        <a href="/" className="header__nav__link">
          Home
        </a>
        <a href="/clubs" className="header__nav__link">
          Clubs
        </a>
        {user ? (
          <a href="/profile" className="header__nav__link">
            Profile
          </a>
        ) : (
          <a href="/login" className="header__nav__link">
            Login
          </a>
        )}
      </nav>
    </section>
  );
};

export { Header };
