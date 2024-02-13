const { error } = require("console");
const http = require("http");
const OpenAI = require("openai");

const port = 3001;

const data = {
  hello: "hello",
  world: "world",
};

const server = http.createServer((req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const urlParsed = new URL(req.url, `http://${req.headers.host}`);
  const pathName = urlParsed.pathname;
  const arrayPath = pathName.match(/\w+/gi);
  const method = req.method;

  if (arrayPath && arrayPath[0] === "chat") {
    if (method === "POST") {
      let body = "";

      req.on("data", (chank) => {
        body += chank;
      });

      req.on("end", () => {
        const { apiKey } = JSON.parse(body);

        const openai = new OpenAI({
          apiKey,
        });

        const chatCompletion = openai.chat.completions.create({
          messages: [{ role: "user", content: "Say this is a test" }],
          model: "gpt-3.5-turbo",
        });

        chatCompletion
          .then((res) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(res));
          })
          .catch((error) => {
            res.writeHead(error.status, { "Content-Type": "application/json" });
            res.end(JSON.stringify(error));
          });
      });
      return;
    }

    if (method === "GET") {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ hello: "error" }));
      return;
    }
  }

  res.end("hello Node");
});

server.listen(port, () => console.log("server start"));
