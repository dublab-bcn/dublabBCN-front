import { navbarS2 } from "@/app/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSlideOver } from "@/app/contexts/useContexts";

const NavBarS2 = (): React.ReactElement => {
  const { isOpen } = useSlideOver();
  const pathname = usePathname(); // Get the current URL path

  return (
    <>
      {!isOpen && (
        <div className="hidden w-full md:grid md:grid-cols-3 gap-px bg-black text-sm font-normal uppercase font-Favorit p-px border-b border-black">
          {navbarS2.map(({ label, route }) => {
            const isActive = pathname === route;
            const isDisabled = route === "";
            const commonClasses = "w-full h-full flex items-center justify-center pt-[2px] whitespace-nowrap transition-colors relative overflow-hidden";

            return (
              <div 
                key={route} 
                className={isActive ? "bg-black" : "bg-white"}
              >
                {isDisabled ? (
                  <div className={`${commonClasses} text-gray-400 select-none`}>                   
                    <span>{label}</span>
                    <span className="absolute text-[10px] top-[10px] font-bold bg-white/80 px-1 border">
                      PROXIMAMENT
                    </span>
                  </div>
                ) : (
                  <Link
                    href={route}
                    className={`${commonClasses} 
                      ${isActive
                        ? "bg-black text-white"
                        : "text-black hover:bg-black hover:text-white"
                      }`}
                  >
                    {label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NavBarS2;
