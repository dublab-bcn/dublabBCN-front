"use client";
import { useSlideOver } from "@/app/contexts/useContexts";
import useMobileComponent from "@/app/lib/hooks/useMobileComponent";
import { ApiBsidesList } from "@/app/types";
import Spinner from "../ui/Spinner";
import { useInView } from "react-intersection-observer";
import { useSpinner } from "@/app/contexts/useContexts";
import ProfilesListArchive from "./ProfilesListArchive";
import { useState, useEffect } from "react";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { useSearch } from "@/app/contexts/SearchContext";

interface ResponsiveMobileProfileList {
  podcastsList: ApiBsidesList;
}

const BsidesResponsiveProfilesList = ({
}: ResponsiveMobileProfileList) => {
  const { isOpen } = useSlideOver();
  const { isLoading, setIsLoading } = useSpinner();
  const { getBsides } = useDublabApi();
  
  const { searchTerm, selectedTags, searchConfig } = useSearch();
  
  const [podcastsList, setPodcastsList] = useState<ApiBsidesList>({
    count: 0,
    next: null,
    previous: null,
    results: []
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 1 });

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    
    try {
      await setIsLoading(true);
      const nextPage = page + 1;
      const nextPageData = await getBsides(nextPage, searchTerm, selectedTags.join(','));
      
      if (nextPageData.results.length > 0) {
        setPodcastsList(prev => ({
          ...prev,
          count: nextPageData.count,
          next: nextPageData.next,
          previous: nextPageData.previous,
          results: [...prev.results, ...nextPageData.results]
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
    const fetchInitialData = async () => {
      await setIsLoading(true);
      try {
        const data = await getBsides(1, searchTerm, selectedTags.join(','));
        setPodcastsList(data);
        setPage(1);
        setHasMore(!!data.next);
      } catch (error) {
        setPodcastsList({
          count: 0,
          next: null,
          previous: null,
          results: []
        });
      } finally {
        await setIsLoading(false);
      }
    };

    if (searchConfig?.type === 'bsides') {
      fetchInitialData();
    }
  }, [searchTerm, selectedTags.join(','), searchConfig]);

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      loadMore();
    }
  }, [inView, isLoading]);

  return (
    <section>
      {!isOpen && (
        <>
          <ProfilesListArchive profilesOrBsides={podcastsList!.results} />
          <div ref={ref}> {isLoading && <Spinner />}</div>
        </>
      )}
    </section>
  );
};

export default BsidesResponsiveProfilesList;