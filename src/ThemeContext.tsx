import { createContext } from "react";

const ThemeContext = createContext<[string, (theme: string) => void]>([
  "tomato",
  function () {},
]); // or "() => {}"

export default ThemeContext;
