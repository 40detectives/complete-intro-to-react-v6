import { useState, useEffect } from "react";
import { Animal, IBreedListAPIResponse } from "./APIResponseTypes";

const localCache: { [index: string]: string[] } = {};

type Status = "unloaded" | "loading" | "loaded";

export default function useBreedList(animal: Animal): [string[], Status] {
  const [breedList, setBreedList] = useState([] as string[]);
  const [status, setStatus] = useState("unloaded" as Status); // possible options will be ["unloaded", "loading", "loaded"]

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      void requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]); // empty the previous breed list to avoid a temporary state with cats that are huskies
      setStatus("loading");

      const response = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = (await response.json()) as IBreedListAPIResponse;
      localCache[animal] = json.breeds || null;
      setBreedList(localCache[animal] || []);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
