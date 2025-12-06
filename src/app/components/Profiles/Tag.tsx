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
          className={`ml-4 h-4  gap-[10px] text-[11px] flex-row py-4 pt-[32px] absolute  flex items-center`}
        >
          {tags.map((tag) => (
            <>
              <li
                className={`bg-${backgroundColor} border-solid border-[1px] z-30 border-slate-600 rounded-md h-6 min-w-fit flex items-center pt-[3px] px-3`}
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
