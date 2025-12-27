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
    <section className="pt-[44px] pb-16 ">
      <ul className="flex flex-col items-center sm:px-8 sm:grid sm:grid-cols-4 w-auto sm:gap-y-14 px-4 gap-x-4 gap-12 sm:place-items-center">
        {latestShows.map((show) => (
          <li
            key={show.slug}
            className="max-w-[353px] h-[385px] relative leading-[120%]"
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
