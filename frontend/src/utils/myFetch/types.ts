export interface MyRequestInit {
  body?: BodyInit | Object | null;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
  integrity?: string;
  keepalive?: boolean;
  method?: string;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  signal?: AbortSignal | null;
  window?: any;
}

export interface MyResponse extends Response {
  parsedBody: any;
}

export type PrefArg = { input: RequestInfo; init?: MyRequestInit | undefined };

export type PreProcessing = (
  input: RequestInfo,
  init?: MyRequestInit | undefined
) => PrefArg | Promise<PrefArg>;

export type PostProcessing = (
  res: Response | MyResponse
) => Promise<MyResponse>;
