interface TagProps {
  isShows: boolean;
  tags: string[];
}

const Tags = ({ tags, isShows }: TagProps) => {
  const backgroundColor = isShows ? "white" : "black";

  return (
    <>
      {tags && (
        <ul
          className={`flex flex-wrap gap-1 md:gap-2`}
        >
          {tags.map((tag) => (
            <>
              <li
                className={`bg-${backgroundColor} border border-slate-600 
                            rounded-md px-3 py-1
                            px-2 py-0.5 text-[8px] 
                            md:px-3 md:py-1 md:text-xs`}
                key={tag}
              >
                {tag}
              </li>
            </>
          ))}
        </ul>
      )}
    </>
  );
};

export default Tags;
