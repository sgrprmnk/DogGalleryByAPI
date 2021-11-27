import { useState, useCallback } from "react";

const identity = (val) => val;

/**
 *  This hook takes as arguments a network call
 *  and optionally a function to call if the netowrk call has been successful.
 *  It returns `isFetching` and `error` states, reponse `data` and a `makeFetch` method.
 *  When `makeFetch` is called, the hook will return `true` for `isFetching`
 *  and subsequently either `data` or `error` (depending on the state of the API call).
 * @param {(...args) => Promise<any>} apiCall
 * The API call to make
 * @param {(any) => any} mapResponse
 * a function to map the response on success
 */
export const useApi = (apiCall, mapResponse = identity) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const makeFetch = useCallback(
    async (...args) => {
      try {
        setError(null);
        setIsFetching(true);
        const res = await apiCall(...args);
        setResponse(mapResponse(res));
        setIsFetching(false);
      } catch (err) {
        setIsFetching(false);
      }
    },
    [apiCall, mapResponse]
  );

  return { isFetching, error, response, makeFetch };
};
