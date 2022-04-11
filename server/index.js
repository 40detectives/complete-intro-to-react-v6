import express from "express";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/frontend/index.html").toString();
const parts = html.split("not rendered");

const app = express();

app.use("/frontend", express.static("dist/frontend"));
app.use((req, res) => {
  res.write(parts[0]);
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.status(staticContext || 200);
    res.write(parts[1]);
    res.end();
  });
});

console.log(`listenin on http://localhost:${PORT}`);
app.listen(PORT);
