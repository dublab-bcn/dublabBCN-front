"use client";
import useMobileComponent from "@/app/lib/hooks/useMobileComponent";
import { ApiProfile, Bside } from "@/app/types";
import { usePathname } from "next/navigation";
import ProfilesList from "../Profiles/ProfilesList";
import ProfilesListMobile from "../Profiles/ProfilesListMobile";
import LoadMoreBsides from "./LoadMoreBsides";
import { useSlideOver } from "@/app/contexts/useContexts";
import { useSearch } from "@/app/contexts/SearchContext";

interface ResponsiveMobileProfileList {
  podcastsList: ApiProfile[] | Bside[];
}

const ResponsiveProfilesList = ({
  podcastsList
}: ResponsiveMobileProfileList) => {
  const pathname = usePathname();
  const isShows = pathname === "/shows";
  const mobileComponent = useMobileComponent();
  const { isOpen } = useSlideOver();

  const { searchConfig } = useSearch();

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