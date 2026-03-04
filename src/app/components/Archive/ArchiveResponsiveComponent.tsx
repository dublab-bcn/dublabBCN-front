"use client";
import { useSlideOver, useSpinner } from "@/app/contexts/useContexts";
import useMobileComponent from "@/app/lib/hooks/useMobileComponent";
import { ApiProfilesList } from "@/app/types";
import ProfilesListMobile from "../Profiles/ProfilesListMobile";
import ProfilesListArchive from "./ProfilesListArchive";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { useSearch } from "@/app/contexts/SearchContext";
import Spinner from "../ui/Spinner";

const ArchivedResponsiveProfilesList = () => {
  const mobileComponent = useMobileComponent();
  const { isOpen } = useSlideOver();
  const { isLoading, setIsLoading } = useSpinner();
  const { getArchivedProfiles } = useDublabApi();

  const { searchTerm, selectedTags, searchConfig } = useSearch();

  const [podcastsList, setPodcastsList] = useState<ApiProfilesList>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    const fetchInitialData = async () => {
      await setIsLoading(true);
      try {
        const data = await getArchivedProfiles(
          1,
          searchTerm,
          selectedTags.join(",")
        );
        setPodcastsList(data);
        setPage(1);
        setHasMore(!!data.next);
      } catch (error) {
        setPodcastsList({
          count: 0,
          next: null,
          previous: null,
          results: [],
        });
      } finally {
        await setIsLoading(false);
      }
    };

    if (searchConfig?.type === 'archive') { 
        fetchInitialData();
    }
  }, [searchTerm, selectedTags.join(","), searchConfig]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    try {
      await setIsLoading(true);
      const nextPage = page + 1;
      const nextPageData = await getArchivedProfiles(
        nextPage,
        searchTerm,
        selectedTags.join(",")
      );

      if (nextPageData.results.length > 0) {
        setPodcastsList((prev) => ({
          ...prev,
          count: nextPageData.count,
          next: nextPageData.next,
          previous: nextPageData.previous,
          results: [...prev.results, ...nextPageData.results],
        }));
        setPage(nextPage);
        setHasMore(!!nextPageData.next);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      setHasMore(false);
    } finally {
      await setIsLoading(false);
    }
  };

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      loadMore();
    }
  }, [inView, isLoading, hasMore]);
  
  return (
    <section>
      {!isOpen && (
        <>
          {mobileComponent ? (
            <ProfilesListMobile seasonProfiles={podcastsList!.results} />
          ) : (
            <ProfilesListArchive profilesOrBsides={podcastsList!.results} />
          )}
        </>
      )}
      <div ref={ref}> {isLoading && <Spinner />}</div>
    </section>
  );
};

export default ArchivedResponsiveProfilesList;
