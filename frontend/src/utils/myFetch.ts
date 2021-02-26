import {
  PreProcessing,
  PostProcessing,
  PrefArg,
  useAuth,
  parseBody,
} from "./myFetchMiddleware";

const myFetch = (
  input: RequestInfo,
  init?: RequestInit | undefined,
  middleware?: { prefList?: PreProcessing[]; postfList?: PostProcessing[] }
): Promise<Response | any> => {
  return new Promise<Response | any>(async (resolve, reject) => {
    let prefList = [useAuth];
    let postfList = [parseBody];
    if (middleware && middleware.prefList) {
      prefList.concat(middleware.prefList);
    }
    if (middleware && middleware.postfList) {
      postfList.concat(middleware.postfList);
    }

    let prefArg = { input, init } as PrefArg;

    for (const pref of prefList) {
      prefArg = await pref(prefArg.input, prefArg.init);
    }

    let res = await fetch(prefArg.input, prefArg.init);

    for (const postf of postfList) {
      res = await postf(res);
    }

    resolve(res);
  });
};

export default myFetch;
