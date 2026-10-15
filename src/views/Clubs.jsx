import { ClubsPreview } from "../components/ClubsPreview";
import { Header } from "../components/Header";

const Clubs = () => {
  return (
    <>
      <Header />
      <section className="clubs">
        <h1>Clubs</h1>
        <p>Find a club with available courts</p>
        <ClubsPreview />
      </section>
    </>
  );
};

export { Clubs };
