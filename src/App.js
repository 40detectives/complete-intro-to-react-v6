import { StrictMode, useState } from "react";
import { Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("peru");
  return (
    <StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">
              <h1 id="my-brand">Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>
        </div>
      </ThemeContext.Provider>
    </StrictMode>
  );
};

export default App;
