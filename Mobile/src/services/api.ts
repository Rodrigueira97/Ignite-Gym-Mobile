import axios, { AxiosInstance } from 'axios';
import { AppError } from '@utils/AppError';

interface SingOutProps {
  signOut: () => void;
}
interface ApiInstaceProps extends AxiosInstance {
  registerInterceptorTokenManager: ({ signOut }: SingOutProps) => () => void;
}

export const api = axios.create({
  timeout: 1000 * 30, // 30 seconds
  baseURL: 'http://127.0.0.1:3333',
}) as ApiInstaceProps;

api.registerInterceptorTokenManager = (signOut) => {};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(error);
    }
  },
);
