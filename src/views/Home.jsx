import { useContext } from "react"
import { ClubsContext } from "../context/ClubsContext"
import { useNavigate } from "react-router-dom"
import '../styles/home.css'

const Home = () => {

    const navigate = useNavigate()
    const {setDateInput} = useContext(ClubsContext)

    const handleDateInput = (e) => {
        setDateInput(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        navigate('/clubs')
    }

    return (
        <section className="home">
            <h1>
                Tenis courts
            </h1>
            <p>
                Today is a nice day to play
            </p>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="date">Enter a date</label>
                <input type="date" name="date" placeholder="Enter a date..." onChange={handleDateInput}/>
                <button>
                    Search
                </button>
            </form>
        </section>
    )
}

export {Home}