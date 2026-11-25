import "dotenv/config";
import express from "express";
import http from "http";
import {fileURLToPath} from "url";
import path from "path";
import { setupSocketServer } from "./socket/socket.js";

const app = express();
const httpServer = http.createServer(app);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


setupSocketServer(httpServer);



const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});