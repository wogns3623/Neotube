export type PrefArg = { input: RequestInfo; init?: RequestInit | undefined };
export type PreProcessing = (
  input: RequestInfo,
  init?: RequestInit | undefined
) => PrefArg | Promise<PrefArg>;
export type PostProcessing = (res: Response | any) => Promise<Response> | any;

const useAuth: PreProcessing = (input, init) => {
  const token = localStorage.getItem("neotube_token");
  console.log("in useAuth, token is", token, typeof token, token !== undefined);
  if (token && token !== "undefined") {
    console.log("token exist");
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
  }

  return { input: input, init: init };
};

const parseBody: PostProcessing = (res) => {
  return new Promise<any>(async (resolve, reject) => {
    console.log("parse body using json format", res.body);
    let jsonBody = await res.json();
    resolve({ ...res, jsonBody: jsonBody });
  });
};

export { useAuth, parseBody };
