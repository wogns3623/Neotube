import { useAuth, stringifyBody, parseBody } from "./middleware";
import {
  MyRequestInit,
  PreProcessing,
  PostProcessing,
  PrefArg,
  MyResponse,
} from "./types";

const myFetch = (
  input: RequestInfo,
  init?: MyRequestInit | undefined,
  middleware?: { prefList?: PreProcessing[]; postfList?: PostProcessing[] }
): Promise<MyResponse> => {
  return new Promise<MyResponse>(async (resolve, reject) => {
    try {
      let prefList = [useAuth, stringifyBody];
      let postfList = [parseBody];
      if (middleware && middleware.prefList) {
        prefList = [...middleware.prefList, ...prefList];
      }
      if (middleware && middleware.postfList) {
        postfList = [...middleware.postfList, ...postfList];
      }

      let prefArg = { input, init } as PrefArg;

      for (const pref of prefList) {
        prefArg = await pref(prefArg.input, prefArg.init);
      }

      let res = (await fetch(
        prefArg.input,
        prefArg.init as RequestInit
      )) as MyResponse;

      for (const postf of postfList) {
        res = await postf(res);
      }

      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};

export default myFetch;
