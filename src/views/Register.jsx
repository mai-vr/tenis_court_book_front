import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/register.css";
import { ERRORS } from "../services/errorMessagges";

const Register = () => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errorComponent, setErrorComponent] = useState("");
  const [loadingComponent, setLoadingComponent] = useState(false);
  const { handleRegister } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (loadingComponent) return;
    setErrorComponent("");
    if (userInput.firstName.length < 2 || userInput.lastName.length < 2) {
      setErrorComponent(ERRORS.nameLength);
      return;
    }

    if (userInput.password.length < 4) {
      setErrorComponent(ERRORS.passwordLength);
      return;
    }

    if (userInput.password !== userInput.passwordConfirmation) {
      setErrorComponent(ERRORS.passwordConfirmation);
      return;
    }
    setLoadingComponent(true);

    try {
      const userDataInput = {
        first_name: userInput.firstName,
        last_name: userInput.lastName,
        email_address: userInput.email,
        password: userInput.password,
        password_confirmation: userInput.passwordConfirmation,
      };
      await handleRegister(userDataInput);
      // navigate("/");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      console.log(error);
      setErrorComponent(err.message || ERRORS.registerFailed);
    } finally {
      setLoadingComponent(true);
    }
  };

  return (
    <section className="register">
      <div className="register__image">
        <img
          src="/clay-court.jpg"
          alt="clay tennis court"
          className="register__image__court"
        />
      </div>
      <div className="register__container">
        <h1 className="register__title">Register</h1>
        <form className="register__form" onSubmit={handleSubmitRegister}>
          <label className="register__label" htmlFor="firstName">
            First name
          </label>
          <input
            className="register__input"
            onChange={handleChangeRegister}
            type="text"
            name="firstName"
            placeholder="Enter your first name"
            disabled={loadingComponent}
            required
          />
          <label className="register__label" htmlFor="lastName">
            Last name
          </label>
          <input
            className="register__input"
            onChange={handleChangeRegister}
            type="text"
            name="lastName"
            placeholder="Enter your last name"
            disabled={loadingComponent}
            required
          />
          <label className="register__label" htmlFor="email">
            Email
          </label>
          <input
            className="register__input"
            onChange={handleChangeRegister}
            type="email"
            name="email"
            placeholder="Enter your email"
            disabled={loadingComponent}
            required
          />
          <label className="register__label" htmlFor="password">
            Password
          </label>
          <input
            className="register__input"
            onChange={handleChangeRegister}
            type="password"
            name="password"
            placeholder="Enter a password"
            disabled={loadingComponent}
            required
          />
          <label className="register__label" htmlFor="passwordConfirmation">
            Password confirmation
          </label>
          <input
            className="register__input"
            onChange={handleChangeRegister}
            type="password"
            name="passwordConfirmation"
            placeholder="Enter the password again"
            disabled={loadingComponent}
            required
          />
          <button className="register__button" disabled={loadingComponent}>
            {loadingComponent ? "Signing in" : "Sign in"}
          </button>
        </form>
        <p className="register__switch">
          <Link to="/login" state={location.state}>
            Log in
          </Link>
        </p>
        {errorComponent && (
          <div className="register__errors">
            <p className="register__error">{errorComponent}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Register };
