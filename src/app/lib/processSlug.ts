import { RadioApiShow } from "../types";
import extractUrlForEmbedPlayer from "@/app/lib/extractUrlForEmbedPlayer";

export const formatSlugToGetShowName = (slug: string): string => {
  if (slug.substring(0, 12) === "macguffin-20") {
    const showIsNeus = "MacGuffin 2.0";
    return showIsNeus;
  }

  if (slug.substring(0, 16) === "cero-en-conducta") {
    const showIsPlants = "@cero.en.conducta";
    return showIsPlants;
  }

  if (slug.substring(0, 14) === "whenplantssing") {
    const showIsPlants = "When...Plants...Sing";
    return showIsPlants;
  }

  const showName = slug
    .replace(/-/g, " ")
    .replace(/\d/g, "")
    .replace(/'/g, "")
    .trim();

  return showName;
};

export const extractDatesForShowList = (slug: string): string => {
  const dates = slug.match(/\d+/g);
  return dates ? dates.join(".") : "";
};

export const extractDatesForUrl = (slug: string): string => {
  if (slug.substring(0, 4) === "6474") {
    const showIsNumeric = "6474";
    return showIsNumeric;
  }

  if (slug.substring(0, 12) === "macguffin-20") {
    const macGuffinDate = slug.slice(13, 21);
    return macGuffinDate;
  }

  const dates = slug.match(/\d+/g);
  return dates ? dates.join("-") : "";
};

export const extractDatesForCard = (slug: string): string => {
  const dates = slug.match(/\d+/g);
  const formattedDates = dates ? dates.join("/") : "";

  return formattedDates;
};

const removeDateAndHyphenFromSlug = (slug: string) => {
  const processedSlug = slug.replace(/-\d{2}-\d{2}-\d{2}$/, "");

  return processedSlug;
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
    const dateA = `20${a.showDateForList.slice(-2)}-${a.showDateForList.slice(
      3,
      5
    )}-${a.showDateForList.slice(0, 2)}`;

    const dateB = `20${b.showDateForList.slice(-2)}-${b.showDateForList.slice(
      3,
      5
    )}-${b.showDateForList.slice(0, 2)}`;

    return dateB.localeCompare(dateA);
  });

  return formattedShows;
};
