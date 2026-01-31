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
          className={`flex flex-wrap gap-2`}
        >
          {tags.map((tag) => (
            <>
              <li
                className={`bg-${backgroundColor} border border-slate-600 rounded-md px-3 py-1 text-xs`}
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
