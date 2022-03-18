import ReactDOM from "react-dom";
import Pet from "./Pet";

/*
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { id: "my-brand" }, "Adopt Me!"),
    // ...[1, 2, 3, 4].map((x) => React.createElement("h1", {}, x)),
    React.createElement(Pet, {
      name: "Luna",
      animal: "Dog",
      breed: "Havanese",
    }),
    React.createElement(Pet, {
      name: "Pepper",
      animal: "Bird",
      breed: "Cockatiel",
    }),
    React.createElement(Pet, {
      name: "Sudo",
      animal: "Dog",
      breed: "Wheaten Terrier",
    }),
  ]);
};
*/

const App = () => {
  return (
    <div>
      <h1 id="my-brand">Adopt Me!</h1>
      <Pet name="Luna" animal="Dog" breed="Havanese"></Pet>
      <Pet name="Pepper" animal="Bird" breed="Cockatiel"></Pet>
      <Pet name="Sudo" animal="Dog" breed="Wheaten Terrier"></Pet>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
