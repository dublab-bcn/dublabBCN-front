import ProfileLinks from "@/app/components/Profiles/ProfileLinks";
import Description from "@/app/components/Profiles/ProfileDescription";
import RelatedShows from "@/app/components/Profiles/ProfileRelatedShows";
import Spinner from "@/app/components/ui/Spinner";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
interface ProfileDetailsProps {
  params: {
    slug: string;
    searchParams: { [slug: string]: string | string[] };
  };
}

export const generateMetadata = ({ params }: ProfileDetailsProps): Metadata => {
  const transformFirstLetter = (firstLetter: string) => {
    return firstLetter.toUpperCase();
  };
  const capitalizeWords = (showName: string) => {
    const formatedShowName = showName.replace(/\b\w/g, transformFirstLetter);

    return formatedShowName;
  };

  const slug = capitalizeWords(params.slug.replace("-", " "));

  return {
    title: `${slug}`,
    description: `Escolta l'arxiu de les retransmisions en directe del programa ${slug}`,
  };
};

const ProfileDetails = async ({ params }: ProfileDetailsProps) => {
  const { getProfileData } = useDublabApi();

  const profileData = await getProfileData(params.slug);

  let profileShowName = params.slug.replace(/-/g, " ");

  if (profileShowName === "macguffin 20") {
    profileShowName = "macguffin 2.0";
  }

  if (profileShowName === "cero en conducta") {
    profileShowName = "@cero.en.conducta";
  }

  if (!profileData) return <Spinner />;

  return (
    <main className="mt-[127px] sm:mt-[160px] 2xl:mt-[200px] p-8">
      <Link
        className="flex items-center w-full h-12 my-2 align-middle text-lg"
        href="/shows"
      >
        ← Retorna a shows
      </Link>
      <div className="gap-[30px] sm:gap-8 flex sm:flex-row flex-col items-start justify-start">
        <Image
          src={profileData.picture}
          alt={""}
          width={660}
          height={327}
          className="w-full sm:w-1/3 w-auto object-contain"
        />
        <section className="sm:overflow-y-scroll scrollbar-hide sm:h-[67vh] w-full">
          <div className="flex justify-between items-end">
            <ul className="flex gap-[10px] opacity-100 sm:opacity-40">
              {profileData.tags.map((tag) => (
                <li
                  key={tag}
                  className={`text-[11px] border rounded-md pt-[5px]  px-2 pb-[3px]`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-fit">
            <h2 className="text-5xl sm:h-[25px] mt-[25px]">{profileShowName}</h2>
            <ul className="flex gap-9 sm:gap-[194px] text-[32px] mt-[20px] sm:mt-[50px]">
              <li>With</li>
              <li className="max-w-[304px] sm:max-w-[400px]">
                {profileData.host}
              </li>
            </ul>
          </div>
          <div
            className={`w-fit md:flex sm:max-w-none mt-8 ${
              profileData.links ? "md:gap-[5.1rem]" : "sm:gap-[5.8rem]"
            }`}
          >
            <ProfileLinks links={profileData.links} />
            <Description description={profileData.description} />
          </div>
          <div className="text-2xl flex items-end justify-between mt-[58px] gap-16 mb-[17px]">
            <h3 className="h-fit">Shows</h3>
          </div>
          
          <section className="flex-col items-end">
            <hr className="border-black w-[99%] " />
            <RelatedShows shows={profileData.shows} />
          </section>
        </section>
      </div> 
    </main>
  );
};

export default ProfileDetails;
