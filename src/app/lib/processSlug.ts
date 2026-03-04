import { RadioApiShow } from "../types";
import extractUrlForEmbedPlayer from "@/app/lib/extractUrlForEmbedPlayer";

export const extractDateFromSlug = (slug: string): string => {
  const dateMatch = slug.match(/-(\d{2}-\d{2}-\d{2})$/);
  return dateMatch ? dateMatch[1] : "";
};

export const getShowNameWithoutDate = (slug: string): string => {
  return slug.replace(/-\d{2}-\d{2}-\d{2}$/, "");
};

export const formatSlugToGetShowName = (slug: string): string => {
  const showNameWithoutDate = getShowNameWithoutDate(slug);
  
  if (showNameWithoutDate === "macguffin-20") {
    return "MacGuffin 2.0";
  }

  if (showNameWithoutDate === "cero-en-conducta") {
    return "@cero.en.conducta";
  }

  if (showNameWithoutDate === "whenplantssing") {
    return "When...Plants...Sing";
  }

  const showName = showNameWithoutDate
    .replace(/-/g, " ")
    .replace(/\d/g, "")
    .replace(/'/g, "")
    .trim();

  return showName;
};

export const extractDatesForShowList = (slug: string): string => {
  const datePart = extractDateFromSlug(slug);
  if (!datePart) return "";
  
  return datePart.replace(/-/g, ".");
};

export const extractDatesForUrl = (slug: string): string => {
  if (slug.substring(0, 4) === "6474") {
    return "6474";
  }

  const datePart = extractDateFromSlug(slug);
  if (datePart) {
    return datePart;
  }
  
  const dates = slug.match(/\d+/g);
  return dates ? dates.join("-") : "";
};

export const extractDatesForCard = (slug: string): string => {
  const datePart = extractDateFromSlug(slug);
  if (!datePart) return "";
  
  const [day, month, year] = datePart.split("-");
  return `${day}/${month}/${year}`;
};

const removeDateAndHyphenFromSlug = (slug: string) => {
  return getShowNameWithoutDate(slug);
};

export const formatAndSortRelatedShowsInfo = (shows: RadioApiShow[]) => {
  const formattedShows = shows.map(({ slug, tags, tracklist, name, host, mixcloud_url}) => {
    const showName = formatSlugToGetShowName(slug);
    const showDateForShowList = extractDatesForShowList(slug);
    const showDateForUrl = extractDatesForUrl(slug);
    const showDateForList = extractDatesForCard(slug);
    const showTags = tags;
    const showTitle = name;
    const showHost = host;
    const showTracklist = tracklist;
    const showMixcloudUrl = extractUrlForEmbedPlayer(mixcloud_url);
    const slugToUrl = removeDateAndHyphenFromSlug(slug);

    return {
      showHost,
      showTitle,
      slugToUrl,
      showTracklist,
      showName,
      showDateForShowList,
      showTags,
      showDateForUrl,
      showDateForList,
      showMixcloudUrl,
    };
  });

  formattedShows.sort((a, b) => {
    const parseDate = (dateStr: string): Date => {
      if (!dateStr || !dateStr.includes('/')) {
        return new Date(0);
      }
      
      const [day, month, year] = dateStr.split('/').map(Number);
      const fullYear = year < 100 ? 2000 + year : year;
      return new Date(fullYear, month - 1, day);
    };

    const dateA = parseDate(a.showDateForList);
    const dateB = parseDate(b.showDateForList);

    return dateB.getTime() - dateA.getTime();
  });

  return formattedShows;
};