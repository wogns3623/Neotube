import { PreProcessing, PostProcessing, MyResponse } from "./types";

export const useAuth: PreProcessing = (input, init) => {
  const token = localStorage.getItem("neotube_token");
  if (token && token !== "undefined") {
    if (init && init.headers) {
      init.headers = {
        ...init.headers,
        Authorization: `JWT ${localStorage.getItem("neotube_token")}`,
      };
    } else {
      init = {
        ...init,
        headers: {
          Authorization: `JWT ${localStorage.getItem("neotube_token")}`,
        },
      };
    }
  }

  return { input: input, init: init };
};

export const stringifyBody: PreProcessing = (input, init) => {
  if (init && init.headers) {
    init.headers = {
      ...init.headers,
      "Content-Type": "application/json",
    };
  } else {
    init = {
      ...init,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  if (init && init.body) {
    init = init as RequestInit;
    init.body = JSON.stringify(init.body);
  }

  return { input: input, init: init };
};

export const parseBody: PostProcessing = (res) => {
  return new Promise<MyResponse>(async (resolve, reject) => {
    let parsedBody = await res.json();
    resolve({ ...res, parsedBody: parsedBody });
  });
};
