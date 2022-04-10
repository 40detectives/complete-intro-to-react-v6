import { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  const themeHook = useState("peru");
  return (
    <ThemeContext.Provider value={themeHook}>
      <div className="p-0 m-0 bg-[url('http://pets-images.dev-apis.com/pets/wallpaperC.jpg')]">
        <Router>
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
        </Router>
      </div>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
