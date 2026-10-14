import { useContext, useState } from "react"
import { AuthContext } from "../context/authContext"
import { useNavigate } from "react-router-dom"

const Register = () => {
    const [userInput, setUserInput] = useState({})
    const [isSuccess, setIsSuccess] = useState(null)
    const {handleRegister} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleChangeRegister = (e) => {
        const {name, value} = e.target
        setUserInput({...userInput, [name]: value})
    }

    const handleSubmitRegister = async (e) => {
        e.preventDefault()
        try {
            const userDataInput = {
                first_name: userInput.firstName,
                last_name: userInput.lastName,
                email_address: userInput.email,
                password: userInput.password,
                password_confirmation: userInput.passwordConfirmation
            }
            await handleRegister(userDataInput)
            navigate('/')
        } catch (error) {
            console.log(error)
            setIsSuccess(false)
        }
    }

    return (
        <section className="register">
            <div className="register__container">
                <form className="register__form" onSubmit={handleSubmitRegister}>
                    <label className="register__label" htmlFor="firstName">First name</label>
                    <input className="register__input" onChange={handleChangeRegister} type="text" name="firstName" placeholder="Enter your first name" />
                    <label className="register__label" htmlFor="lastName">Last name</label>
                    <input className="register__input" onChange={handleChangeRegister} type="text" name="lastName" placeholder="Enter your last name" />
                    <label className="register__label" htmlFor="email">Email</label>
                    <input className="register__input" onChange={handleChangeRegister} type="email" name="email" placeholder="Enter your email" />
                    <label className="register__label" htmlFor="password">Password</label>
                    <input className="register__input" onChange={handleChangeRegister} type="password" name="password" placeholder="Enter a password" />
                    <label className="register__label" htmlFor="passwordConfirmation">Password confirmation</label>
                    <input className="register__input" onChange={handleChangeRegister} type="password" name="passwordConfirmation" placeholder="Enter the password again" />
                    <button className="register__button">
                        Sign in
                    </button>
                    {
                        isSuccess === false && <p>
                            Some fields are incorrect
                        </p>
                    }
                </form>
            </div>
        </section>
    )
}

export {Register}