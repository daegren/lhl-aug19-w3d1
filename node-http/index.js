const http = require("http");
const url = require("url");

const PORT = 8080;

let counter = 8999;

const routeHandlers = {
  GET: {
    "/": (req, res) => res.end("Hello, World!"),
    "/goodbye": (req, res) => res.end("Goodbye, World!")
  },
  POST: {
    "/counter": (req, res) => {
      counter++;
      res.end(counter.toString());
    }
  }
};

const server = http.createServer((req, res) => {
  const method = req.method;
  const path = url.parse(req.url).path;
  console.log(`Processing request: ${method} ${path}`);

  if (routeHandlers[method][path]) {
    routeHandlers[method][path](req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log("Server is listening at http://localhost:8080");
});
