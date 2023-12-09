const { endpoints } = require("@/utils/endpoints");
const { default: http } = require("@/utils/http");
const { useQuery } = require("@tanstack/react-query");

const fetchBatch = async () => {
  const data = await http().get(`${endpoints.batch.getAll}/${id}`);
  return data;
};

export function useFetchQuiz(shouldFetch) {
  const { data, isLoading, isError, error } = useQuery(
    ["fetchBatchQuiz"],
    () => fetchBatch(),
    {
      enabled: shouldFetch,
    }
  );

  return shouldFetch
    ? { data, isLoading, isError, error }
    : { data: null, isLoading: false };
}
