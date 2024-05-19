import { useState, useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { errorActions } from '../../store/slices/errorSlice';

type ApiResponse<T> = {
  data: T;
  message: string;
  success: boolean;
  ok: boolean;
};

export const useHttpClient = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async <T>(
      url: string,
      method: string = 'GET',
      body: object | null = null,
      headers: Record<string, string> = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        User: 'test',
      }
    ): Promise<ApiResponse<T>> => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body: body ? JSON.stringify(body) : null,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await handleResponse<T>(response);

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        if (httpAbortCtrl.signal.aborted) {
          return Promise.reject(new Error('Request was aborted'));
        }

        const errorMsg = err.message ?? 'An unknown error occurred';
        setError(err.message ?? 'An unknown error occurred');
        dispatch(errorActions.setError({ error: true, errorMsg }));
        setIsLoading(false);
        return Promise.reject(err);
      }
    },
    [dispatch]
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  const responseData: ApiResponse<T> = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Network response was not ok');
  }
  return { ...responseData, ok: response.ok };
};
