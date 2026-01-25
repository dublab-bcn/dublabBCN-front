export interface DropdownItem {
  label: string;
  route: string;
}

export const firstNavLabels = [
  { label: "shows", route: "/shows" },
  { label: "b-sides", route: "/b-sides" },
  { label: "Calendari", route: "/calendari" },
  { label: "Arxiu", route: "/arxiu" },
  
];

export const lastNavLabels: DropdownItem[] = [
  { label: "Info", route: "/info" },
];

export const legalLinks: DropdownItem[] = [
  {
    label: "Política de privacitat",
    route: "/politica-privacitat",
  },
];

export const programesDropDown: DropdownItem[] = [
  { label: "shows", route: "/shows" },
  { label: "b-sides", route: "/b-sides" },
];

export const dublabSisters: DropdownItem[] = [
  { label: "Dublab.com", route: "https://www.dublab.com/" },
  { label: "Dublab.jp", route: "https://dublab.jp/" },
  { label: "Dublab.br", route: "https://dublab.com.br/2022/" },
  { label: "Dublab.de", route: "https://dublab.de/" },
];

export const navbarS1 = [
  { label: "Calendari", route: "/calendari" },
  { label: "Arxiu", route: "/arxiu" },
  { label: "Merch", route: "https://dublabbcn.bigcartel.com/" },
  { label: "Donate", route: "https://www.mixcloud.com/dublabes/subscribe/" },
];

export const navbarS2 = [
  { label: "Shows", route: "/shows" },
  { label: "BSides", route: "/b-sides" },
  { label: "Merch", route: "https://dublabbcn.bigcartel.com/" },
];
