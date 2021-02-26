export type PrefArg = { input: RequestInfo; init?: RequestInit | undefined };
export type PreProcessing = (
  input: RequestInfo,
  init?: RequestInit | undefined
) => PrefArg | Promise<PrefArg>;
export type PostProcessing = (res: Response | any) => Promise<Response> | any;

const useAuth: PreProcessing = (input, init) => {
  if (init) {
    (init as RequestInit).headers = {
      ...init?.headers,
      Authorization: `JWT ${localStorage.getItem("neotube_token")}`,
    };
  } else {
    init = {
      headers: {
        Authorization: `JWT ${localStorage.getItem("neotube_token")}`,
      },
    };
  }

  return { input: input, init: init };
};
const parseBody: PostProcessing = (res) => {
  console.log(res.body);

  return new Promise<any>((resolve, reject) => {
    let jsonBody = res.json();
    resolve({ ...res, jsonBody: jsonBody });
  });
};

export { useAuth, parseBody };
