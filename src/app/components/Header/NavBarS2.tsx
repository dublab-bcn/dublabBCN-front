import { navbarS2 } from "@/app/paths";
import Link from "next/link";
import { useSlideOver } from "@/app/contexts/useContexts";

const NavBarS2 = (): React.ReactElement => {
  const { isOpen } = useSlideOver();

  return (
    <>
{!isOpen && (
  <div className="hidden w-full md:grid md:grid-cols-3 gap-px bg-black text-sm font-normal uppercase font-Favorit p-px border-b border-black ltr-grid"> {/* Added border-b */}
    {navbarS2.map(({ label, route }) => (
      <div 
        key={route} 
        className="h-[40px] md:h-[102px] bg-white"
      >
        <Link 
          href={route} 
          className="w-full h-full flex items-center justify-center pt-[2px] hover:bg-black hover:text-white whitespace-nowrap"
        >
          {label}
        </Link>
      </div>
    ))}
  </div>
)}
    </>
  );
};

export default NavBarS2;
