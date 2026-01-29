import { navbarS1 } from "@/app/paths";
import Link from "next/link";
import { useSlideOver } from "@/app/contexts/useContexts";

const NavBarS1 = (): React.ReactElement => {
  const { isOpen } = useSlideOver();

  return (
    <>
      {!isOpen && (
        <div className="hidden md:block">
          <nav className="h-[42px] sm:flex justify-end rounded-md font-Favorit text-sm font-normal uppercase">
            <ul className="flex items-center flex-row justify-between gap-10 lg:gap-[80px]">
              {navbarS1.map(({ label, route }) => (
                <li key={route} className="pt-[2px] hover:opacity-50 whitespace-nowrap">
                  <Link href={route}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default NavBarS1;
