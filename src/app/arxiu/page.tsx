import { Metadata } from "next";
import ArchivedResponsiveProfilesList from "../components/Archive/ArchiveResponsiveComponent";
import Spinner from "../components/ui/Spinner";
import useDublabApi from "../lib/hooks/useDublabApi";

export const metadata: Metadata = {
  title: "Arxiu",
  description: "Programes programes que en el passat s'han emès a dublab bcn",
};

const ArchivedProfiles = async () => {
  const { getArchivedProfiles } = useDublabApi();
  const archivePage = "1";

  const archivedProfiles = await getArchivedProfiles(archivePage);

  if (!archivedProfiles) return <Spinner />;

  return (
    <main className="flex flex-col bg-black text-white pt-[260px] md:pt-[400px]">
      <section>
        <ArchivedResponsiveProfilesList podcastsList={archivedProfiles} />
      </section>
    </main>
  );
};

export default ArchivedProfiles;
