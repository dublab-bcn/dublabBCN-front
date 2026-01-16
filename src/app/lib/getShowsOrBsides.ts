interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface FetchCallback<T> {
  (page: string): Promise<PaginatedResponse<T>>;
}

const getProfilesOrBsides = async <T>(
  fetchCallback: FetchCallback<T>,
  options?: {
    maxConcurrentRequests?: number;
    maxTotalPages?: number;
  }
): Promise<PaginatedResponse<T>[]> => {
  const { maxConcurrentRequests = 5, maxTotalPages = 50 } = options || {};

  try {
    const firstPage = await fetchCallback("1");
    const totalItems = firstPage.count;
    const pageSize = firstPage.results.length;

    if (pageSize === 0 || totalItems <= pageSize) {
      return [firstPage];
    }

    const totalPagesFromApi = Math.ceil(totalItems / pageSize);
    const totalPages = Math.min(totalPagesFromApi, maxTotalPages);

    const allPages = Array.from(
      { length: totalPages - 1 }, 
      (_, index) => (index + 2).toString()
    );

    const allResponses: PaginatedResponse<T>[] = [firstPage];

    for (let i = 0; i < allPages.length; i += maxConcurrentRequests) {
      const batch = allPages.slice(i, i + maxConcurrentRequests);
      
      const batchPromises = batch.map(async (page) => {
        try {
          return await fetchCallback(page);
        } catch (error) {
          return {
            count: 0,
            next: null,
            previous: null,
            results: [],
          } as PaginatedResponse<T>;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      allResponses.push(...batchResults);
    }

    return allResponses;

  } catch (error) {
    throw new Error(
      `Failed to fetch initial data: ${error instanceof Error ? error.message : String(error)}`
    );
  }
};

export default getProfilesOrBsides;