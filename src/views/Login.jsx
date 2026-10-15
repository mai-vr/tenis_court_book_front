import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [userInput, setUserInput] = useState({});
  const [isSuccess, setIsSuccess] = useState(null);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log(userInput);
    try {
      const dataInput = {
        email_address: userInput.email,
        password: userInput.password,
      };
      console.log(dataInput);
      await handleLogin(dataInput);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
    }
  };

  return (
    <section className="login">
      <div className="login__image">
        <img
          src="/cement-court.jpg"
          alt="cement tennis court"
          className="login__image__court"
        />
      </div>
      <div className="login__container">
        <h1 className="login__title">Log in</h1>
        <form className="login__form" onSubmit={handleLoginSubmit}>
          <label htmlFor="email" className="login__label">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="login__input"
            onChange={handleLoginChange}
            placeholder="Enter a valid email"
          />
          <label htmlFor="password" className="login__label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="login__input"
            onChange={handleLoginChange}
            placeholder="Enter your password"
          />
          <button className="login__button">Log in</button>
        </form>
        <p className="login__switch">
          <Link to="/register">Register</Link>
        </p>
        {isSuccess === false && (
          <p className="login__error">Could not log in</p>
        )}
      </div>
    </section>
  );
};

export { Login };
