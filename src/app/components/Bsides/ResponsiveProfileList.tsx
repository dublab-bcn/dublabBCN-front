"use client";
import useMobileComponent from "@/app/lib/hooks/useMobileComponent";
import { ApiProfile, Bside } from "@/app/types";
import { usePathname } from "next/navigation";
import ProfilesList from "../Profiles/ProfilesList";
import ProfilesListMobile from "../Profiles/ProfilesListMobile";
import LoadMoreBsides from "./LoadMoreBsides";
import { useSlideOver } from "@/app/contexts/useContexts";
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import SearchBar from "@/app/components/SearchBar/SearchBar";
import { useRouter, useSearchParams } from 'next/navigation';
import getTags from "@/app/components/SearchBar/TagsLists";

interface ResponsiveMobileProfileList {
  podcastsList: ApiProfile[] | Bside[];
  initialSearchQuery?: string;
}

const ResponsiveProfilesList = ({
  podcastsList, initialSearchQuery = ''
}: ResponsiveMobileProfileList) => {
  const pathname = usePathname();
  const isShows = pathname === "/shows";
  const mobileComponent = useMobileComponent();
  const { isOpen } = useSlideOver();

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery)
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags)

  const tagsClass = getTags();
  const tags = tagsClass.CurrentShows;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  const handleSearchSubmit = (event?: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    } else {
      params.delete('search');
    }
    
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    } else {
      params.delete('tags');
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearchSubmit()
    }, 300)
    
    return () => clearTimeout(timeoutId)
  }, [selectedTags, searchTerm])

  return (
    <section>
      <SearchBar
        onSubmit={handleSearchSubmit}
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Buscar shows..."
        tags={tags}
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
        version = "shows"
      />
      {!isOpen && (
        <>
          {mobileComponent ? (
            <ProfilesListMobile seasonProfiles={podcastsList} />
          ) : (
            <ProfilesList profilesOrBsides={podcastsList} />
          )}
          {!isShows && <LoadMoreBsides isMobile={mobileComponent} />}
        </>
      )}
    </section>
  );
};

export default ResponsiveProfilesList;
