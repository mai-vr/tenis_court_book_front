import { authenticatedFetch } from "./api.js";

const API_URL = "https://tenis-court-book.onrender.com/api/v1";
const TOKEN = "authToken";

const getAllClubs = async () => {
  try {
    const response = await fetch(`${API_URL}/clubs`, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const getOneClub = async (id) => {
  try {
    const response = await fetch(`${API_URL}/clubs/${id}`, { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const courtsOfOneClub = async (clubId) => {
  try {
    const response = await fetch(`${API_URL}/clubs/${clubId}/courts`, {
      method: "GET",
    });
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const reservation = async (clubId, reservationData) => {
  try {
    const token = localStorage.getItem(TOKEN);
    const response = await authenticatedFetch(
      `${API_URL}/clubs/${clubId}/reservations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const reservationsOfOneClub = async (clubId) => {
  try {
    const token = localStorage.getItem(TOKEN);

    const response = await authenticatedFetch(
      `${API_URL}/clubs/${clubId}/reservations`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    if (!response.ok) throw data;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const myReservations = async () => {
  try {
    const response = await authenticatedFetch(
      `${API_URL}/users/me/reservations`,
      {
        method: "GET",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteReservation = async (clubId, reservationId) => {
  try {
    const response = await authenticatedFetch(
      `${API_URL}/clubs/${clubId}/reservations/${reservationId}`,
      {
        method: "DELETE",
      },
    );

    const data = await response.json();

    if (!response.ok) throw data;

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export {
  getAllClubs,
  getOneClub,
  courtsOfOneClub,
  reservation,
  reservationsOfOneClub,
  myReservations,
  deleteReservation,
};
