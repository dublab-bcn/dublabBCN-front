import { Metadata } from "next";
import ArchivedResponsiveProfilesList from "../components/Archive/ArchiveResponsiveComponent";
import Spinner from "../components/ui/Spinner";
import useDublabApi from "../lib/hooks/useDublabApi";

export const metadata: Metadata = {
  title: "Arxiu",
  description: "Programes programes que en el passat s'han emès a dublab bcn",
};

const ArchivedProfiles = async ({
    searchParams,
  }: {
    searchParams?: { [key: string]: string | string[] | undefined };
  }) => {
  
  const searchQuery = searchParams?.search?.toString() || '';
  const tagsQuery = searchParams?.tags?.toString() || '';
  
  const { getArchivedProfiles } = useDublabApi();
  const archivePage = "1";

  const archivedProfiles = await getArchivedProfiles(archivePage);

  if (!archivedProfiles) return <Spinner />;

  return (
    <main className="bg-black text-white flex flex-col md:pl-[50px] md:pr-[50px] pt-[260px] md:pt-[280px] 2xl:pt-[340px] pb-16">
      <section>
        <ArchivedResponsiveProfilesList podcastsList={archivedProfiles} />
      </section>
    </main>
  );
};

export default ArchivedProfiles;
