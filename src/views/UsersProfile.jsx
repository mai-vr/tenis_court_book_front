import { UserReservation } from "../components/UserReservation";
import "../styles/profile.css";

const UserProfile = () => {
  return (
    <section className="user__profile">
      <div className="user__profile__header">
        <h1 className="user__profile__title">Your reservations</h1>
        <p className="user__profile__subtitle">
          Enjoy playing tennis in the selected days.
        </p>
      </div>
      <UserReservation />
    </section>
  );
};

export { UserProfile };
