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
    <section className="pt-8 pb-16">
      <ul className="flex flex-col items-center sm:px-8 md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestShows.map((show) => (
          <li
            key={show.slug}
            className="relative"
          >
            {Object.prototype.hasOwnProperty.call(show, "host") ? (
              <ShowCard
                show={show}
                height={"385"}
                onClickPlayback={handleCardShow}
              />
            ) : (
              <BsideCard
                bside={show as Bside}
                height={"385"}
                onClickPlayback={handleCardShow}
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LatestShowsFixedHeight;
