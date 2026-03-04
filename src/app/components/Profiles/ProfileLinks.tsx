import Link from "next/link";

interface ProfileLinksProps {
  links: string[];
}

const ProfileLinks = ({ links }: ProfileLinksProps) => {
  if (links === null) {
    return <div className="h-[68px] md:w-[203px]"></div>;
  }

  const formatLinkText = (link: string): string => {
    if (link.includes("instagram.com")) {
      return "Instagram";
    }
    if (link.includes("mixcloud.com")) {
      return "mixcloud";
    }
    if (link.includes("twitter")) {
      return "Twitter";
    }
    if (link.includes("soundcloud.com")) {
      return "soundcloud";
    } else return "website";
  };

  return (
    <>
      {links.length > 0 && (
        <ul className="text-xs sm:text-base ">
          {links.map((link, index) => {
            const formattedUrl = formatLinkText(link);
            return (
              <li className="md:w-[193px]" key={link}>
                <Link
                  target="blank"
                  className=""
                  href={link}
                >{`${String(index + 1).padStart(
                  3,
                  "0",
                )} ${formattedUrl}`}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default ProfileLinks;
