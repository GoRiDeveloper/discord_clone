import axios, {
    type AxiosInstance,
    type InternalAxiosRequestConfig,
} from 'axios';

import { errorResponseInterceptor } from '@/interceptors';

/**
 * Axios instance.
 */
export const Axios: AxiosInstance = axios.create();

Axios.interceptors.request.use((req: InternalAxiosRequestConfig) => req);
Axios.interceptors.response.use((res) => res, errorResponseInterceptor);
