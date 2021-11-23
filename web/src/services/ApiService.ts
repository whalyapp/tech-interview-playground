import 'whatwg-fetch';
import { isEmpty } from 'lodash';

// import AuthService from './AuthService';

export type StatusCode = 'ok' | 'error';

interface ApiResponse {
  status: StatusCode;
}

export interface DataResponse<T> extends ApiResponse {
  data: T;
}

export interface DataListResponse<T> extends ApiResponse {
  data: T[];
  count: number;
  first_result?: number;
  max_results?: number;
  total?: number;
}

export function extractData<T>(dataResponse: DataResponse<T>) {
  return dataResponse.data;
}

export function extractDataList<T>(dataResponse: DataListResponse<T>) {
  return dataResponse.data;
}

interface ApiOptions {
  authUrl?: boolean;
  localUrl?: boolean;
  loginUrl?: boolean;
  adminApi?: object;
  withCredentials?: boolean;
  authenticated?: boolean;
}

export interface CancelablePromise<T> {
  promise: Promise<T>;
  cancel: () => void;
}


const API_URL = `http://localhost:4000/`;

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

function paramsToQueryString(paramsArg: { [key: string]: any } = {}) {
  if (!paramsArg) return '';
  const paramsToArray: string[] = Object.keys(paramsArg);
  const str: string = paramsToArray
    .filter(key => paramsArg[key] !== undefined)
    .map(
      key => `${encodeURIComponent(key)}=${encodeURIComponent(paramsArg[key])}`,
    )
    .join('&');
  return str.length ? `?${str}` : '';
}

function request(
  method: RequestMethod,
  endpoint: string,
  options: {
    params?: { [key: string]: any };
    body?: any;
    headers?: { [key: string]: any };
    localUrl?: boolean;
    loginUrl?: boolean;
    authUrl?: boolean;
    adminApi?: object;
    withCredentials?: boolean;
    authenticated?: boolean;
  } = {},
) {
  const baseUrl = API_URL;

  const url = `${baseUrl}${endpoint}${paramsToQueryString(options.params)}`;

  const requestHeaders = new Headers(options.headers || {});
  //   requestHeaders.append('X-Requested-By', 'whaly-frontend-app');

  

  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  if (options.body instanceof FormData || options.body instanceof Blob) {
    config.body = options.body;
  } else if (options.body) {
    if (isEmpty(options.headers)) {
      // default headers: application/json
      requestHeaders.append('Accept', 'application/json');
      requestHeaders.append('Content-Type', 'application/json');
      config.body = JSON.stringify(options.body);
    } else {
      config.body = options.body;
    }
  }

  if (options.withCredentials) {
    config.credentials = 'include';
  }

  const checkAndParse = (response: Response) => {
    const contentType = response.headers.get('Content-Type');

    if (response.status === 401) {
      const event = new Event('unauthorizedEvent');
      document.dispatchEvent(event);
    }

    if (
      contentType &&
      (contentType.indexOf('image/png') !== -1 ||
        contentType.indexOf('application/octet-stream') !== -1)
    ) {
      return response.blob().then(blob => {
        if (!response.ok) {
          Promise.reject(blob);
        }
        return blob;
      });
    } else if (contentType && contentType.indexOf('text/html') !== -1) {
      return response.status < 400
        ? Promise.resolve()
        : Promise.reject(response);
    } else if (contentType && contentType.indexOf('text/plain') !== -1) {
      return response.status < 400
        ? response.text()
        : Promise.reject(response)
    }

    // Considered as a json response by default
    return response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    });
  };

  return fetch(url, config) // eslint-disable-line no-undef
    .then(checkAndParse);
}

function getRequest<T>(
  endpoint: string,
  params: { [key: string]: any } = {},
  headers: { [key: string]: any } = {},
  options: ApiOptions = {},
): Promise<T> {
  return request('get', endpoint, {
    params,
    headers,
    ...options,
    authenticated:
      options.authenticated !== undefined ? options.authenticated : true,
  }) as Promise<T>;
}

function postRequest<T>(
  endpoint: string,
  body: any,
  params: { [key: string]: any } = {},
  headers: { [key: string]: any } = {},
  options: ApiOptions = {},
): Promise<T> {
  return request('post', endpoint, {
    params,
    headers,
    body,
    ...options,
    authenticated:
      options.authenticated !== undefined ? options.authenticated : true,
  }) as Promise<T>;
}

function putRequest<T>(
  endpoint: string,
  body: any,
  params: { [key: string]: any } = {},
  headers: { [key: string]: any } = {},
  options: ApiOptions = {},
): Promise<T> {
  return request('put', endpoint, {
    params,
    headers,
    body,
    ...options,
    authenticated:
      options.authenticated !== undefined ? options.authenticated : true,
  }) as Promise<T>;
}

function deleteRequest<T>(
  endpoint: string,
  params: { [key: string]: any } = {},
  headers: { [key: string]: any } = {},
  options: ApiOptions = {},
): Promise<T> {
  return request('delete', endpoint, {
    params,
    headers,
    ...options,
    authenticated:
      options.authenticated !== undefined ? options.authenticated : true,
  }) as Promise<T>;
}

export default {
  request,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
