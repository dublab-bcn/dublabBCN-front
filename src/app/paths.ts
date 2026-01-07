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
