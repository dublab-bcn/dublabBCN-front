import ProfileLinks from "@/app/components/Profiles/ProfileLinks";
import Description from "@/app/components/Profiles/ProfileDescription";
import RelatedShows from "@/app/components/Profiles/ProfileRelatedShows";
import Spinner from "@/app/components/ui/Spinner";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

const ArchivedProfileDetails = async ({ params }: ProfileDetailsProps) => {
  const { getArchivedProfileData } = useDublabApi();

  const profileData = await getArchivedProfileData(params.slug);

  if (!profileData) return <Spinner />;

  const defaultImage = profileData.picture
    ? profileData.picture
    : "/assets/arxiu-default-page.jpg";

  return (
    <main className="mt-[127px] md:mt-[160px] 2xl:mt-[200px] p-8  bg-black text-white">
      <Link
        className="flex items-center w-full h-12 my-2 align-middle text-lg"
        href="/arxiu"
      >
        ← Retorna a arxiu
      </Link>
      <div className="gap-[30px] md:gap-8 flex sm:flex-row flex-col items-start justify-start">
        <Image
          src={defaultImage}
          alt={""}
          width={660}
          height={327}
          className="w-full md:w-1/3 w-auto object-contain"
        />
        <section className="md:overflow-y-scroll scrollbar-hide md:h-[67vh]
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:transparent
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className="flex justify-between items-end">
            <ul className="flex gap-[10px] pr-4 opacity-100 sm:opacity-70">
              {profileData.tags.map((tag) => (
                <li
                  key={tag}
                  className={`text-[11px] border rounded-md pt-[6px]  px-2 pb-[3px] text-white `}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-fit">
            <h2 className="text-5xl sm:h-[25px] mt-[25px]">{profileData.name}</h2>
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
          <section className="flex-col items-end">
            <div className="text-2xl flex items-end justify-between mt-[58px] gap-16 mb-[17px]">
              <h3 className="h-fit">Shows Relacionats</h3>
            </div>
            <hr className="border-white w-full " />
            <RelatedShows shows={profileData.shows} />
          </section>
        </section>
      </div>

    </main>
  );
};

export default ArchivedProfileDetails;
