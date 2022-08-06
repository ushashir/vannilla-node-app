import http from "http";
const {
  readAllCompanies,
  readSingleCompany,
  createCompany,
  editCompany,
  deleteCompany,
} = require("../lib/controller");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (
    req.method === "GET" &&
    (req.url === "/api/org" || req.url === "/api/org/" || req.url === "/")
  )
  
  {
    readAllCompanies(req, res);
  } else if (req.url?.match(/\/api\/org\/([0-9]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    readSingleCompany(req, res, id);
  } else if (req.url === "/api/org" && req.method === "POST") {
    createCompany(req, res);
  } else if (
    req.url?.match(/\/api\/org\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    editCompany(req, res, id);
  } else if (
    req.url?.match(/\/api\/org\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteCompany(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Organisation not Found" }));
  }
});

server.listen(PORT, () => console.log("Server is running on port: " + PORT));

