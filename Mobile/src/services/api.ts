import axios, { AxiosInstance } from 'axios';
import { AppError } from '@utils/AppError';

type SignOut = () => void;
interface ApiInstaceProps extends AxiosInstance {
  registerInterceptorTokenManager: (signOut: SignOut) => () => void;
}

export const api = axios.create({
  timeout: 1000 * 30, // 30 seconds
  baseURL: 'http://127.0.0.1:3333',
}) as ApiInstaceProps;

api.registerInterceptorTokenManager = (signOut) => {
  const interceptorTokenManger = api.interceptors.response.use(
    (response) => response,
    (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response?.data?.message === 'token.expired' ||
          requestError.response?.data?.message === 'token.invalid'
        ) {
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

  function handleEjectInterceptorTokenManager() {
    api.interceptors.response.eject(interceptorTokenManger);
  }

  return handleEjectInterceptorTokenManager();
};
