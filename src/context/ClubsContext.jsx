import { createContext, useContext, useState, useEffect } from "react";
import {
  courtsOfOneClub,
  getAllClubs,
  getOneClub,
  reservationsOfOneClub,
  myReservations,
  deleteReservation,
} from "../services/clubsApi";
import { ERRORS } from "../services/errorMessagges";

const ClubsContext = createContext();

const ClubsProvider = ({ children }) => {
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [clubs, setClubs] = useState([]); // An array with all the clubs to show.
  const [selectedClub, setSelectedClub] = useState({});
  const [courts, setCourts] = useState([]); // All the courts from one club selected.
  const [reservationsByClub, setReservationsByClub] = useState({});
  const [courtsByClub, setCourtsByClub] = useState({});
  const [userReservation, setUserReservation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log(data);
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
      console.log("Consultando reservas");
      const data = await reservationsOfOneClub(clubId);
      if (data) {
        setReservationsByClub((prev) => ({
          ...prev,
          [clubId]: data,
        }));
        console.log("Reservas:", data[0]);
      }
    } catch (error) {
      console.log(error);
      setError(ERRORS.getReservations);
    }
  };

  const getUserReservation = async () => {
    try {
      const data = await myReservations();
      setUserReservation(data);
    } catch (error) {
      console.log(error);
      setError(ERRORS.getReservations);
    } finally {
      setLoading(false);
    }
  };

  const deleteUserReservation = async (clubId, reservationId) => {
    try {
      await deleteReservation(clubId, reservationId);

      setUserReservation((prev) =>
        prev.filter((reservation) => reservation.id !== reservationId),
      );
    } catch (error) {
      console.log(error);
      setError(ERRORS.deleteReservation);
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
        getUserReservation,
        userReservation,
        error,
        loading,
        deleteUserReservation,
      }}
    >
      {children}
    </ClubsContext.Provider>
  );
};

export { ClubsContext, ClubsProvider };
