import { webApiUrl } from './AppSettings';
import SessionManager from './SessionManager';
export interface HttpRequest<REQB> {
  path: string;
  method?: string;
  body?: REQB;
}
export interface HttpResponse<RESB> {
  ok: boolean;
  body?: RESB;
  errorBody?: any;
}

const logError = async (request: Request, response: Response): Promise<any> => {
  const contentType = response.headers.get('content-type');
  let body: any;
  if (contentType && contentType.indexOf('application/json') !== -1) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  console.error(`Error requesting ${request.method}${request.url}`, body);
  return body;
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
  const response = await fetch(requestBase);
  if (response.ok) {
    const body = await response.json();
    return { ok: response.ok, body };
  } else {
    const errorBody = await logError(requestBase, response);
    return { ok: response.ok, errorBody: errorBody };
  }
};
