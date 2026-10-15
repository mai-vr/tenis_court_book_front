import { ClubsPreview } from "../components/ClubsPreview";
import { Header } from "../components/Header";
import "../styles/clubs.css";

const Clubs = () => {
  return (
    <>
      <Header />
      <section className="clubs">
        <h1 className="clubs__title">Clubs</h1>
        <p className="clubs__subtitle">Find a club with available courts</p>
        <ClubsPreview />
      </section>
    </>
  );
};

export { Clubs };
