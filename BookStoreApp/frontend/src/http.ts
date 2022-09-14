import { webApiUrl } from './AppSettings';
import SessionManager from './SessionManager';

//import { BookListViewFromServer } from './Data/BookData';
export interface HttpRequest<REQB> {
  path: string;
  method?: string;
  body?: REQB;
}
export interface HttpResponse<RESB> {
  ok: boolean;
  body?: RESB;
}

const logError = async (request: Request, response: Response) => {
  const contentType = response.headers.get('content-type');
  let body: any;
  if (contentType && contentType.indexOf('application/json') !== -1) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  console.error(`Error requesting ${request.method}${request.url}`, body);
};

export const http = async <RESB, REQB = undefined>(
  config: HttpRequest<REQB>,
  isFormData: boolean,
  isProtect?: boolean,
): Promise<HttpResponse<RESB>> => {
  let token;
  let requestBase;
  if (isProtect) {
    token = SessionManager.getToken();
    requestBase = new Request(`${webApiUrl}${config.path}`, {
      method: config.method || 'get',
      headers: isFormData
        ? { Authorization: 'Bearer ' + token }
        : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
      body: isFormData
        ? config.body
          ? (config.body as unknown as FormData)
          : undefined
        : JSON.stringify(config.body),
    });
  } else {
    requestBase = new Request(`${webApiUrl}${config.path}`, {
      method: config.method || 'get',
      headers: isFormData
        ? undefined
        : {
            'Content-Type': 'application/json',
          },
      body: isFormData
        ? config.body
          ? (config.body as unknown as FormData)
          : undefined
        : JSON.stringify(config.body),
    });
  }
  /*const request = new Request(`${webApiUrl}${config.path}`, {
    method: config.method || 'get',
    //headers: { 'Content-Type': 'undefined' },
    headers: isProtect
      ? {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        }
      : isFormData
      ? undefined
      : { 'Content-Type': 'application/json' },
    body: isFormData
      ? config.body
        ? (config.body as unknown as FormData)
        : undefined
      : JSON.stringify(config.body),
  });*/
  const response = await fetch(requestBase);
  if (response.ok) {
    const body = await response.json();
    return { ok: response.ok, body };
  } else {
    logError(requestBase, response);
    return { ok: response.ok };
  }
};
