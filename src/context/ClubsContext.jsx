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
  const [dateInput, setDateInput] = useState(() => {
    return (
      localStorage.getItem("reservationDate") ||
      new Date().toISOString().split("T")[0]
    );
  });
  const [clubs, setClubs] = useState([]); // An array with all the clubs to show.
  const [selectedClub, setSelectedClub] = useState({});
  const [courts, setCourts] = useState([]); // All the courts from one club selected.
  const [reservationsByClub, setReservationsByClub] = useState({});
  const [courtsByClub, setCourtsByClub] = useState({});
  const [userReservation, setUserReservation] = useState([]);
  const [loading, setLoading] = useState({
    clubs: false,
    selectedClub: false,
    courts: false,
    reservations: false,
    userReservations: false,
    deletingReservation: false,
  });
  const [error, setError] = useState({
    clubs: null,
    selectedClub: null,
    courts: null,
    reservations: null,
    userReservations: null,
    deletingReservation: null,
  });

  useEffect(() => {
    localStorage.setItem("reservationDate", dateInput);
  }, [dateInput]); // When the user changes the date input, it´s updated.

  const getClubs = async () => {
    setLoading((prev) => ({ ...prev, clubs: true }));
    setError((prev) => ({ ...prev, clubs: null }));
    try {
      const data = await getAllClubs();
      if (data) {
        setClubs(data);
        console.log(clubs);
      }
    } catch (error) {
      console.log(error);
      setError((prev) => ({ ...prev, clubs: ERRORS.getClubs }));
    } finally {
      setLoading((prev) => ({ ...prev, clubs: false }));
    }
  };

  const getAClub = async (id) => {
    setLoading((prev) => ({ ...prev, selectedClub: true }));
    setError((prev) => ({ ...prev, selectedClub: null }));
    try {
      const data = await getOneClub(id);
      if (data) {
        setSelectedClub(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
      setError((prev) => ({ ...prev, selectedClub: ERRORS.getClubs }));
    } finally {
      setLoading((prev) => ({ ...prev, selectedClub: false }));
    }
  };

  const getCourts = async (id) => {
    setLoading((prev) => ({ ...prev, courts: true }));
    setError((prev) => ({ ...prev, courts: null }));

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
      setError((prev) => ({ ...prev, courts: ERRORS.getCourts }));
    } finally {
      setLoading((prev) => ({ ...prev, courts: false }));
    }
  };

  const getReservationsOneClub = async (clubId) => {
    setLoading((prev) => ({ ...prev, reservations: true }));
    setError((prev) => ({ ...prev, reservations: null }));

    try {
      const data = await reservationsOfOneClub(clubId);
      if (data) {
        setReservationsByClub((prev) => ({
          ...prev,
          [clubId]: data,
        }));
        // console.log("Reservas:", data[0]);
      }
    } catch (error) {
      console.log(error);
      setError((prev) => ({
        ...prev,
        reservations: ERRORS.getReservations,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, reservations: false }));
    }
  };

  const getUserReservation = async () => {
    setLoading((prev) => ({ ...prev, userReservations: true }));
    setError((prev) => ({ ...prev, userReservations: null }));

    try {
      const data = await myReservations();
      setUserReservation(data);
    } catch (error) {
      console.log(error);
      setError((prev) => ({
        ...prev,
        userReservations: ERRORS.getReservations,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, userReservations: false }));
    }
  };

  const deleteUserReservation = async (clubId, reservationId) => {
    setLoading((prev) => ({ ...prev, deletingReservation: true }));
    setError((prev) => ({ ...prev, deletingReservation: null }));

    try {
      await deleteReservation(clubId, reservationId);

      setUserReservation((prev) =>
        prev.filter((reservation) => reservation.id !== reservationId),
      );
    } catch (error) {
      console.log(error);
      setError((prev) => ({
        ...prev,
        deletingReservation: ERRORS.deleteReservation,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, deletingReservation: false }));
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
