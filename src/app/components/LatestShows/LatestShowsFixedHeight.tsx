"use client";
import { Bside, RadioApiShow } from "@/app/types";
import BsideCard from "./BsideCard";
import ShowCard from "./ShowCard";
import { useMixCloud } from "@/app/contexts/MixCloudContext"; 

interface LatestShowsFixedHeightProps {
  latestShows: RadioApiShow[] | Bside[];
}

const LatestShowsFixedHeight = ({
  latestShows,
}: LatestShowsFixedHeightProps) => {
  const { playProgram } = useMixCloud();
  const handleCardShow = (showFromCard: string) => {
    playProgram(showFromCard);
  };

  return (
    <section className="pt-8 pb-16 flex flex-col items-center sm:px-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
      {latestShows.map((show) => (
        Object.prototype.hasOwnProperty.call(show, "host") ? (
          <ShowCard
            key={show.slug}
            show={show}
            height={"385"}
            onClickPlayback={handleCardShow}
          />
        ) : (
          <BsideCard
            key={show.slug} // Add key prop
            bside={show as Bside}
            height={"385"}
            onClickPlayback={handleCardShow}
          />
        )
      ))}
    </section>
  );
};

export default LatestShowsFixedHeight;