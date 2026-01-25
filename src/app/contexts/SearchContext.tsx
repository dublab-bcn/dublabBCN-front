"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import getTags from '@/app/components/SearchBar/TagsLists';
import useDublabApi from '@/app/lib/hooks/useDublabApi';

interface SearchConfig {
  type: 'shows' | 'bsides' | 'archive' | 'none';
  placeholder: string;
  apiFunction: (page: number, search?: string, tags?: string) => Promise<any>;
}

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  handleSearchSubmit: () => void;
  currentTags: string[];
  searchConfig: SearchConfig | null;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const initialSearch = searchParams.get('search') || '';
  const initialTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : [];
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [searchConfig, setSearchConfig] = useState<SearchConfig | null>(null);
  const { getProfiles, getBsides, getArchivedProfiles } = useDublabApi();

  useEffect(() => {
    const tagsClass = getTags();
    let config: SearchConfig;
    
    if (pathname === '/shows') {
      config = {
        type: 'shows',
        placeholder: 'Buscar shows...',
        apiFunction: async (page: number, search?: string, tags?: string) => {
          return getProfiles(page, search, tags);
        },
      };
    } else if (pathname === '/b-sides') {
      config = {
        type: 'bsides',
        placeholder: 'Buscar bsides...',
        apiFunction: async (page: number, search?: string, tags?: string) => {
          return getBsides(page, search, tags);
        },
      };
    } else if (pathname === '/arxiu') {
      config = {
        type: 'archive',
        placeholder: '',
        apiFunction: async (page: number, search?: string, tags?: string) => {
          return getArchivedProfiles(page, search, tags);
        },
      };
    }
    else {
      config = {
        type: 'none',
        placeholder: '',
        apiFunction: async () => ({ results: [] }),
      };
    }
    setSearchConfig(config);
  }, [pathname]);


  const getCurrentTags = () => {
    const tagsClass = getTags();
    if (pathname === '/shows') return tagsClass.CurrentShows;
    if (pathname === '/b-sides') return tagsClass.Bsides;
    if (pathname === '/arxiu') return tagsClass.Bsides;
    return [];
  };

  const handleSearchSubmit = () => {
    if (!searchConfig || searchConfig.type === 'none') return;
    
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
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== initialSearch || selectedTags.join(',') !== initialTags.join(',')) {
        handleSearchSubmit();
      }
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedTags]);

  return (
    <SearchContext.Provider value={{
      searchTerm,
      setSearchTerm,
      selectedTags,
      setSelectedTags,
      handleSearchSubmit,
      currentTags: getCurrentTags(),
      searchConfig,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}