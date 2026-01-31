import { Metadata } from "next";
import BsidesResponsiveProfilesList from "../components/Archive/BsidesResponsiveComponent";
import useDublabApi from "../lib/hooks/useDublabApi";

export const metadata: Metadata = {
  title: "b-sides",
  description:
    "Pàgina on es poden veure els programes que diferents convidats han gravat a la ràdio.",
};

export const revalidate = 7200;

const BsidesList = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const searchQuery = searchParams?.search?.toString() || '';
  const tagsQuery = searchParams?.tags?.toString() || '';

  const { getBsides } = useDublabApi();

  const fetchProfiles = (page: string) => {
    return getBsides(page, searchQuery, tagsQuery);
  };

  const bSidesList = await fetchProfiles("1");

  if (!bSidesList) return <div>Loading...</div>;

  return (
    <main className="bg-black text-white flex flex-col md:pl-[50px] md:pr-[50px] pt-[260px] md:pt-[280px] 2xl:pt-[340px] pb-16">
      <BsidesResponsiveProfilesList/>
    </main>
  );
};

export default BsidesList;
