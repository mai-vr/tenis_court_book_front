import { useParams } from "react-router-dom";
import { AvailableSlots } from "../components/AvailableSlots";
import { useContext, useEffect } from "react";
import { ClubsContext } from "../context/ClubsContext";

const Reservation = () => {
  const { getAClub } = useContext(ClubsContext);
  const { id } = useParams();

  useEffect(() => {
    getAClub(id);
  }, [id]);
  return (
    <section className="reservation">
      <h1>Hi from reservation.</h1>
      <AvailableSlots />
    </section>
  );
};

export { Reservation };
