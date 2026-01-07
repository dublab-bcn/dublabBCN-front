import { dublabSisters } from "@/app/paths";
import Link from "next/link";


const Sisters = (): React.ReactElement => {
  return (
    <div>
      <span>Sisters</span>
      <ul className="mt-[26px]">
        {dublabSisters.map(({ label, route }) => (
          <li className="h-8 w-max " key={label}>
            <Link href={route}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sisters;
