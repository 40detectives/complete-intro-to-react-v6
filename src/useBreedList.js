import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded"); // possible options will be ["unloaded", "loading", "loaded"]

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]); // empty the previous breed list to avoid a temporary state with cats that are huskies
      setStatus("loading");

      const response = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await response.json();
      localCache[animal] = json.breeds || null;
      setBreedList(localCache[animal] || []);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
