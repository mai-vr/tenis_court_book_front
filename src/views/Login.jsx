import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/login.css";
import { ERRORS } from "../services/errorMessagges";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [loadingComponent, setLoadingComponent] = useState(false);
  const [errorComopnent, setErrorComponent] = useState("");
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (loadingComponent) return;
    setErrorComponent("");
    setLoadingComponent(true);
    console.log(userInput);
    try {
      const dataInput = {
        email_address: userInput.email,
        password: userInput.password,
      };
      console.log(dataInput);
      await handleLogin(dataInput);
      // navigate("/");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorComponent(error.message || ERRORS.loginFailed);
    } finally {
      setLoadingComponent(false);
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
            disabled={loadingComponent}
            required
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
            disabled={loadingComponent}
            required
          />
          <button className="login__button" disabled={loadingComponent}>
            {loadingComponent ? "Loggin in" : "Log in"}
          </button>
        </form>
        <p className="login__switch">
          <Link to="/register" state={location.state}>
            Register
          </Link>
        </p>
        {errorComopnent && <p className="login__error">{errorComopnent}</p>}
      </div>
    </section>
  );
};

export { Login };
