import { createContext, useContext, useState, useEffect } from "react";
import {
  courtsOfOneClub,
  getAllClubs,
  getOneClub,
  reservationsOfOneClub,
} from "../services/clubsApi";

const ClubsContext = createContext();

const ClubsProvider = ({ children }) => {
  const [dateInput, setDateInput] = useState(null);
  const [clubs, setClubs] = useState([]); // An array with all the clubs to show.
  const [selectedClub, setSelectedClub] = useState({});
  const [courts, setCourts] = useState([]); // All the courts from one club selected.
  const [reservationsByClub, setReservationsByClub] = useState({});
  const [courtsByClub, setCourtsByClub] = useState({});

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

  const getAClub = async (id) => {
    try {
      const data = await getOneClub(id);
      if (data) {
        setSelectedClub(data);
        console.log(selectedClub);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCourts = async (id) => {
    try {
      const data = await courtsOfOneClub(id);
      if (data) {
        setCourts(data);
        console.log(courts);
        setCourtsByClub((prev) => ({
          ...prev,
          [id]: data,
        }));
      }
      console.log("canchas: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const getReservationsOneClub = async (clubId) => {
    try {
      const data = await reservationsOfOneClub(clubId);
      if (data) {
        setReservationsByClub((prev) => ({
          ...prev,
          [clubId]: data,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClubsContext.Provider
      value={{
        setDateInput,
        dateInput,
        getClubs,
        clubs,
        getAClub,
        selectedClub,
        getCourts,
        courts,
        reservationsByClub,
        getReservationsOneClub,
        courtsByClub,
      }}
    >
      {children}
    </ClubsContext.Provider>
  );
};

export { ClubsContext, ClubsProvider };
