import { Metadata } from "next";
import ArchivedResponsiveProfilesList from "../components/Archive/ArchiveResponsiveComponent";
export const metadata: Metadata = {
  title: "Arxiu",
  description: "Programes programes que en el passat s'han emès a dublab bcn",
};

const ArchivedProfiles = async () => {  
  return (
    <main className="bg-black text-white flex flex-col md:pl-[50px] md:pr-[50px] pt-[260px] md:pt-[280px] 2xl:pt-[340px] pb-16">
      <section>
        <ArchivedResponsiveProfilesList/>
      </section>
    </main>
  );
};

export default ArchivedProfiles;
