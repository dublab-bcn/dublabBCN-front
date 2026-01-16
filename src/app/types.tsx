export interface RadioLiveShow {
  name: string;
  starts: string;
  url: string;
  ends: string;
  description: string;
}

export interface LiveRadioData {
  currentShow: RadioLiveShow[];
  nextShow: RadioLiveShow[];
}

export interface RadioApiShow {
  name?: string;
  date: string | number | Date;
  host?: string;
  tags?: string[];
  slug: string;
  tracklist?: string;
  mixcloud_url: string;
  profile_picture?: string;
  picture?: string;
}

export interface RadioShow {
  host?: string;
  tags: string[];
  data: string;
  name: string;
  tracklist?: string;
  mixcloud_url: string;
}

export interface Bside {
  name: string;
  date: string | Date;
  slug: string;
  tags: string[];
  description: string;
  picture: string;
  mixcloud_url: string;
  tracklist: string;
}

export interface ApiProfile {
  id: number;
  host: string;
  slug: string;
  description: string;
  tags: string[];
  picture: string;
  links: string[];
  shows: RadioApiShow[];
}

export interface ApiBsidesList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bside[];
}

export interface ApiProfilesList {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiProfile[];
}

export interface LatestShowsData {
  results: RadioApiShow[];
}

export interface AirtimeShow {
  start_timestamp: string;
  end_timestamp: string;
  name: string;
  description: string;
  id: number;
  instance_id: number;
  instance_description: string;
  url: string;
  starts: string;
  ends: string;
}

export interface WeekInfo {
  monday: AirtimeShow[];
  tuesday: AirtimeShow[];
  wednesday: AirtimeShow[];
  thursday: AirtimeShow[];
  friday: AirtimeShow[];
  saturday: AirtimeShow[];
  sunday: AirtimeShow[];
  nextmonday: AirtimeShow[];
  nexttuesday: AirtimeShow[];
  nextwednesday: AirtimeShow[];
  nextthursday: AirtimeShow[];
  nextfriday: AirtimeShow[];
  nextsaturday: AirtimeShow[];
  nextsunday: AirtimeShow[];
}
