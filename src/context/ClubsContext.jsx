import { createContext, useContext, useState, useEffect } from "react"

const ClubsContext = createContext()

const ClubsProvider = ({children}) => {

    const [dateInput, setDateInput] = useState(null)

    return (
        <ClubsContext.Provider value={{ setDateInput }} >
            {children}
        </ClubsContext.Provider>
    )
}

export {ClubsContext, ClubsProvider}