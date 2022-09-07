import { webApiUrl } from './AppSettings';
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
): Promise<HttpResponse<RESB>> => {
  const request = new Request(`${webApiUrl}${config.path}`, {
    method: config.method || 'get',
    //headers: { 'Content-Type': 'undefined' },
    headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
    body: isFormData
      ? config.body
        ? (config.body as unknown as FormData)
        : undefined
      : JSON.stringify(config.body),
  });
  const response = await fetch(request);
  if (response.ok) {
    const body = await response.json();
    return { ok: response.ok, body };
  } else {
    logError(request, response);
    return { ok: response.ok };
  }
};
