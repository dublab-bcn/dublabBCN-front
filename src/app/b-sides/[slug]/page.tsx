import BsideInfo from "@/app/components/BsideDetailedContent";
import extractUrlForEmbedPlayer from "@/app/lib/extractUrlForEmbedPlayer";
import useDublabApi from "@/app/lib/hooks/useDublabApi";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

interface BSideDetailsProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = ({ params }: BSideDetailsProps): Metadata => {
  const transformFirstLetter = (firstLetter: string) => {
    return firstLetter.toUpperCase();
  };

  const capitalizeWords = (showName: string) => {
    const formatedShowName = showName
      .replace(/\b\w/g, transformFirstLetter)
      .replace("-", " ");

    return formatedShowName;
  };

  const slug = capitalizeWords(params.slug.replace("-", " "));

  return {
    title: `${slug} | dublab`,
    description: `Escolta l'arxiu del en directe del programa ${slug}`,
  };
};

const BsideDetails = async ({ params }: BSideDetailsProps) => {
  const { getBsideData } = useDublabApi();
  const bside = await getBsideData(params.slug);

  if (!bside) return <div>Loading...</div>;

  const showUrl = extractUrlForEmbedPlayer(bside.mixcloud_url);
  const description = {
    __html: bside.description,
  };

  return (
    <main className="mt-[127px] md:mt-[160px] 2xl:mt-[200px] p-8 bg-black text-white">
      <Link
        className="flex items-center w-full h-12 my-2 align-middle text-lg"
        href="/b-sides"
      >
        ← Retorna a b-sides
      </Link>
      <div className="gap-[30px] md:gap-8 flex sm:flex-row flex-col items-start justify-start">
        <Image
          src={bside.picture}
          alt={""}
          width={660}
          height={327}
          className="w-full md:w-1/3 object-contain"
        />
        <BsideInfo
          showUrl={showUrl}
          description={description}
          name={bside.name}
          tags={bside.tags}
          tracklist={bside.tracklist}
        />
      </div>

    </main>
  );
};

export default BsideDetails;
