"use client";
import { useSlideOver } from "@/app/contexts/useContexts";
import useMobileComponent from "@/app/lib/hooks/useMobileComponent";
import { ApiBsidesList } from "@/app/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ProfilesListMobile from "../Profiles/ProfilesListMobile";
import Spinner from "../ui/Spinner";
import { useInView } from "react-intersection-observer";
import { useSpinner } from "@/app/contexts/useContexts";
import ProfilesListArchive from "./ProfilesListArchive";
import { useState, useEffect } from "react";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import getTags from "@/app/components/SearchBar/TagsLists";
import { ChangeEvent, FormEvent } from 'react'
import SearchBar from "@/app/components/SearchBar/SearchBar";

interface ResponsiveMobileProfileList {
  podcastsList: ApiBsidesList;
}

const BsidesResponsiveProfilesList = ({
}: ResponsiveMobileProfileList) => {
  const mobileComponent = useMobileComponent();
  const { isOpen } = useSlideOver();
  const { isLoading, setIsLoading } = useSpinner();
  const { getBsides } = useDublabApi();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialSearch = searchParams.get('search') || '';
  const initialTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : [];
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [podcastsList, setPodcastsList] = useState<ApiBsidesList>({
    count: 0,
    next: null,
    previous: null,
    results: []
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 1 });

  const tagsClass = getTags();
  const tags = tagsClass.Bsides;

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

    fetchInitialData();
  }, [searchTerm, selectedTags.join(',')]);

  useEffect(() => {
    if (inView && !isLoading && hasMore) {
      loadMore();
    }
  }, [inView, isLoading]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
  };

  const handleSearchSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const params = new URLSearchParams();
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }
    
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearchSubmit();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [selectedTags, searchTerm]);


  return (
    <section>
      <SearchBar
        onSubmit={handleSearchSubmit}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar bsides..."
        tags={tags}
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
        version = "bsides"
      />
      {!isOpen && (
        <>
          {mobileComponent ? (
            <ProfilesListMobile seasonProfiles={podcastsList!.results} />
          ) : (
            <ProfilesListArchive profilesOrBsides={podcastsList!.results} />
          )}
          <div ref={ref}> {isLoading && <Spinner />}</div>
        </>
      )}
    </section>
  );
};

export default BsidesResponsiveProfilesList;
