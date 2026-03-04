'use client'
import { ChangeEvent, FC, FormEvent, useState, useRef } from 'react'
import Image from "next/image";

interface SearchBarProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  tags?: string[]
  selectedTags?: string[]
  onTagChange?: (selectedTags: string[]) => void
  version?: string
}

const SearchBar: FC<SearchBarProps> = ({
  onSubmit,
  value,
  onChange,
  placeholder = 'Search by title, keyword...',
  tags = [],
  selectedTags = [],
  onTagChange = () => {},
  version
}) => {
  const [tagFilter, setTagFilter] = useState('')
  const tagsContainerRef = useRef<HTMLDivElement>(null)
  
  const filteredTags = tags.filter(tag =>
    tag.toLowerCase().includes(tagFilter.toLowerCase())
  )

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    onTagChange(newSelectedTags)
  }

  const titleMapDesktop = {
    shows: 'Residents <br/> programs',
    bsides: 'Guests <br/> shows',
    archive: 'Arxiu <br/> 2016 - 2023',
    default: 'Cerca'
  };

  const titleMapMobile = {
    shows: 'Residents programs',
    bsides: 'Guests shows',
    archive: 'Arxiu 2016 - 2023',
    default: 'Cerca'
  };

  const titleTextDesktop = titleMapDesktop[version as keyof typeof titleMapDesktop] || titleMapDesktop.default;
  const titleTextMobile = titleMapMobile[version as keyof typeof titleMapMobile] || titleMapMobile.default;


  const [isTagsVisible, setIsTagsVisible] = useState(false);

  return (
    <div className={`md:h-[120px] 2xl:h-[140px] px-4 pb-4 grid grid-1 md:flex md:gap-4 ${version === 'shows' ? 'bg-white' : 'bg-black'}`}>
      <h2 className={`hidden md:block w-64 flex-none text-2xl font-semibold mb-2 mt-4 align-middle md:pl-[50px] ${version === 'shows' ? 'text-black' : 'text-white'}`}
        dangerouslySetInnerHTML={{ __html: titleTextDesktop }}
      ></h2>
      <h2 className={`block md:hidden w-64 flex-none text-xl font-semibold mb-1 mt-4 align-middle md:pl-[50px] ${version === 'shows' ? 'text-black' : 'text-white'}`}
        dangerouslySetInnerHTML={{ __html: titleTextMobile }}
      ></h2>
      <form
        onSubmit={onSubmit}
        className={`grid grid-cols-1 md:grid-cols-8 gap-4 w-full `}
      >
        <div className='w-full md:px-4 mt-4 flex md:col-start-2 col-span-2'>
          <input
            type="search"
            name="search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`h-8 pl-3 w-3/4 md:w-full rounded-md border border-[#EBEEF7] text-sm ${
              version === 'shows' ? 'bg-white' : 'bg-black text-white'
            }`}
          />

          {tags.length > 0 && (
          <button
            type="button"
            onClick={() => setIsTagsVisible(!isTagsVisible)}
            className={`w-1/4 md:hidden flex items-center justify-center h-8 rounded-md border border-[#EBEEF7] text-lg ${
              version === 'shows' ? 'bg-white' : 'text-white'
            }`}
          >
            <Image
              src={version === 'shows' ? "/assets/arrow.svg" : "/assets/arrow_white.svg"}
              width={20}
              height={20}
              alt={""}
              className={`object-contain ${isTagsVisible ? 'transform rotate-180' : 'transform rotate-0'}`}
            />
          </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className={`md:col-span-5 mt-4${isTagsVisible ? '' : ' hidden md:block'}`}>
              <div
                ref={tagsContainerRef}
                className="flex flex-wrap gap-2 overflow-y-auto h-[6rem] 2xl:h-[7rem]
                [&::-webkit-scrollbar]:w-2
                [&::-webkit-scrollbar-track]:rounded-full
                [&::-webkit-scrollbar-track]:transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
              >
                <input
                  type="text"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  placeholder="Filter tags..."
                  className={`px-3 py-1 rounded-full h-[1.5rem] 2xl:h-[2rem] text-xs 2xl:text-sm font-medium transition-all flex-shrink-0 whitespace-nowrap
                    ${(version === 'shows' ? 'bg-gray-100 text-gray-700 border hover:bg-gray-200' : 'bg-black text-white shadow-sm border border-white')}`
                  }
                />
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-1 rounded-full  h-[1.5rem] 2xl:h-[2rem] text-xs 2xl:text-sm font-medium transition-all flex-shrink-0 whitespace-nowrap ${
                        selectedTags.includes(tag)
                          ? (version === 'shows' ? 'bg-black text-white shadow-sm' : 'bg-white text-black shadow-sm border ')
                          : (version === 'shows' ? 'bg-gray-100 text-gray-700 border hover:bg-gray-200' : 'bg-black text-white shadow-sm border border-white') 
                      }`}
                    >
                      {tag}
                    </button>
                  ))
                ) : (
                  <div className="text-gray-500 text-sm py-2 px-4">
                    Cap tag &quot;{tagFilter}&quot;
                  </div>
                )}
              </div>
          </div>
        )}
      </form>
    </div>
  )
}

export default SearchBar