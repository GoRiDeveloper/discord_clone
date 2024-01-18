import { AxiosError } from 'axios';

/**
 * Interceptor to handle possible errors in our response to an http request.
 *
 * @param { AxiosError<any> } error - Request response errors with axios.
 */
export const errorResponseInterceptor:
    | ((_error: AxiosError<any>) => never | void)
    | null
    | undefined = (error: AxiosError<any>): any => {
    console.error({ error });
};
