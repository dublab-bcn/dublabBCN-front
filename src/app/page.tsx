import HeroSection from "./components/HeroSection";
import LatestShowsFixedHeight from "./components/LatestShows/LatestShowsFixedHeight";
import PrivacyDisclaimer from "./components/PrivacyDisclaimer";
import useDublabApi from "./lib/hooks/useDublabApi";
import mergeBsidesWithShows from "./lib/mergeBsidesWithShows";

export const revalidate = 1800; // revalidate every 30 minutes

const Home = async () => {
  const pageToGet = 1;
  const { getBsides, getLatestsShowsData } = useDublabApi();

  const [latestShowsResponse, bSidesResponse] = await Promise.all([
    getLatestsShowsData(pageToGet),
    getBsides(pageToGet)
  ]);

  const latestShows = latestShowsResponse.results;
  const bSides = bSidesResponse.results;

  const latestPodcasts = mergeBsidesWithShows(latestShows, bSides);
  const trimmedShows = latestPodcasts.slice(0, 8);

  return (
    <>
      <main className="flex flex-col">
        <HeroSection />
        <PrivacyDisclaimer />
        <LatestShowsFixedHeight latestShows={trimmedShows} />
      </main>
    </>
  );
};

export default Home;
