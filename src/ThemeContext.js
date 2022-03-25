import { createContext } from "react";

const ThemeContext = createContext(["tomato", function () {}]); // or "() => {}"

export default ThemeContext;
