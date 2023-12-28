// import { useState } from 'react';
import axios, { AxiosError, AxiosInstance } from 'axios';
import { storageAuthTokenGet } from '@storage/storageAuthToken';
import { AppError } from '@utils/AppError';

type SignOut = () => void;
interface ApiInstaceProps extends AxiosInstance {
  registerInterceptorTokenManager: (signOut: SignOut) => () => void;
}

interface PromiseProps {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

export const api = axios.create({
  timeout: 1000 * 30, // 30 seconds
  baseURL: 'http://127.0.0.1:3333',
}) as ApiInstaceProps;

// const [failedQueue, setFailedQueue] = useState<PromiseProps[]>([]);
// const [isRefreshing, setIsRefreshing] = useState(false);

api.registerInterceptorTokenManager = (signOut) => {
  const interceptorTokenManger = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        const errorMessage = requestError.response.data?.message;

        if (errorMessage === 'token.expired' || errorMessage === 'token.invalid') {
          const { refresh_token } = await storageAuthTokenGet();

          if (!refresh_token) {
            signOut();

            return Promise.reject(requestError);
          }

          // const originalRequestConfig = requestError.config;

          // if (isRefreshing) {
          //   return new Promise((resolve, reject) => {
          //     setFailedQueue((state) => [
          //       ...state,
          //       {
          //         onSuccess: (token) => {
          //           originalRequestConfig.headers = { Authorization: `Bearer ${token}` };
          //           resolve(api(originalRequestConfig));
          //         },
          //         onFailure: (error: AxiosError) => {
          //           reject(error);
          //         },
          //       },
          //     ]);
          //   });
          // }

          // setIsRefreshing(true);

          // return new Promise(async (resolve, reject) => {
          //   try {
          //     const { data } = await api.post('/sessions/refresh-token', { refresh_token });

          //     console.log(data);
          //   } catch (error: any) {
          //     failedQueue.forEach((request) => {
          //       request.onFailure(error);
          //     });

          //     signOut();
          //     reject(error);
          //   } finally {
          //     setIsRefreshing(false);
          //     setFailedQueue([]);
          //   }
          // });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    },
  );

  return () => {
    api.interceptors.response.eject(interceptorTokenManger);
  };
};
