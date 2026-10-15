import { ClubsPreview } from "../components/ClubsPreview";

const Clubs = () => {
  return (
    <section className="clubs">
      <h1>Clubs</h1>
      <p>Find a club with available courts</p>
      <ClubsPreview />
    </section>
  );
};

export { Clubs };
