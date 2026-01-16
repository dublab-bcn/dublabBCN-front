'use client'
import { ChangeEvent, FC, FormEvent, useState, useRef } from 'react'

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

  const clearAllTags = () => {
    onTagChange([])
  }

  const scrollTags = (direction: 'left' | 'right') => {
    if (tagsContainerRef.current) {
      const scrollAmount = 200
      tagsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={"mb-3 mx-auto flex w-full max-w-3xl flex-col items-center gap-3 rounded-xl border-2 border-[#EBEEF7] px-3 py-2" + (version === 'shows' ? ' bg-white' : ' bg-black')}
    >
      {/* Main search row */}
      <div className="flex w-full flex-col md:flex-row gap-3">
        <div className="ml-1 flex w-full items-center gap-3">
          <input
            type="search"
            name="search"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={"w-full py-4 rounded-md border border-[#EBEEF7] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AAFF]/20 pl-2" + (version === 'shows' ? ' bg-white' : ' bg-black')}
          />
        </div>
      </div>

      {/* Tags section */}
      {tags.length > 0 && (
        <div className="w-full">
          {/* Scrollable tags container with navigation */}
          <div className="flex gap-2">
            {/* Left scroll button */}
            <button
              type="button"
              onClick={() => scrollTags('left')}
              className={"h-1/2 mt-2 z-10 rounded-full p-1 shadow-md hover:shadow-lg" + (version === 'shows' ? ' bg-white' : ' bg-black border border-white')}
              aria-label="Scroll tags left"
            >
              <svg className={"w-5 h-5" + (version === 'shows' ? ' text-black' : ' text-white')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Tags container */}
            <div
              ref={tagsContainerRef}
              className="flex gap-2 overflow-x-auto px-1 py-2 scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 10px), transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 10px), transparent)',
              }}
            >
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 whitespace-nowrap ${
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
                  Cap tag "{tagFilter}"
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => scrollTags('right')}
              className={"h-1/2 mt-2 z-10 rounded-full p-1 shadow-md hover:shadow-lg" + (version === 'shows' ? ' bg-white' : ' bg-black border border-white')}
              aria-label="Scroll tags right"
            >
              <svg className={"w-5 h-5"+ (version === 'shows' ? ' text-black' : ' text-white')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-2 mt-2">
            {/* Filter input for tags */}
            <div className="relative flex-1">
              <input
                type="text"
                value={tagFilter}
                onChange={(e) => setTagFilter(e.target.value)}
                placeholder="Filter tags..."
                className={"w-full rounded-md border border-[#EBEEF7] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00AAFF]/20" + (version === 'shows' ? ' bg-white' : ' bg-black')}
              />
              {tagFilter && (
                <button
                  type="button"
                  onClick={() => setTagFilter('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            
            {/* Clear button */}
            {selectedTags.length > 0 && (
              <button
                type="button"
                onClick={clearAllTags}
                className="text-sm text-[#00AAFF] hover:text-[#037AB6] whitespace-nowrap px-3 py-2"
              >
                Netejar tags ({selectedTags.length})
              </button>
            )}
          </div>

        </div>
      )}
    </form>
  )
}

export default SearchBar