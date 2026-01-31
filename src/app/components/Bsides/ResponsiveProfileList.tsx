"use client";
import { ApiProfile, Bside } from "@/app/types";
import ProfilesList from "../Profiles/ProfilesList";
import { useSlideOver } from "@/app/contexts/useContexts";

interface ResponsiveMobileProfileList {
  podcastsList: ApiProfile[] | Bside[];
}

const ResponsiveProfilesList = ({
  podcastsList
}: ResponsiveMobileProfileList) => {
  const { isOpen } = useSlideOver();

  return (
    <section>
      {!isOpen && (
        <ProfilesList 
          profilesOrBsides={podcastsList}
        />
      )}
    </section>
  );
};

export default ResponsiveProfilesList;