import { createContext, useContext, useState, useEffect } from "react";
import { getAllClubs } from "../services/clubsApi";

const ClubsContext = createContext();

const ClubsProvider = ({ children }) => {
  const [dateInput, setDateInput] = useState(null);
  const [clubs, setClubs] = useState([]); // An array with all the clubs to show.

  const getClubs = async () => {
    try {
      const data = await getAllClubs();
      if (data) {
        setClubs(data);
        console.log(clubs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClubsContext.Provider value={{ setDateInput, getClubs, clubs }}>
      {children}
    </ClubsContext.Provider>
  );
};

export { ClubsContext, ClubsProvider };
