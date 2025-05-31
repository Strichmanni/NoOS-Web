import express from "express";
import { createServer } from "node:http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const app = express();
const server = createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Statische Dateien ausliefern
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());

// GET: Lade Apps
app.get("/api/apps", (req, res) => {
  const filePath = path.join(__dirname, "static", "apps.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Fehler beim Lesen");
    res.json(JSON.parse(data));
  });
});

// POST: Neue App hinzufügen
app.post("/api/apps", (req, res) => {
  const filePath = path.join(__dirname, "static", "apps.json");
  const newApp = req.body;
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Fehler beim Lesen");
    const apps = JSON.parse(data);
    apps.push(newApp);
    fs.writeFile(filePath, JSON.stringify(apps, null, 2), (err) => {
      if (err) return res.status(500).send("Fehler beim Schreiben");
      res.status(201).send("App hinzugefügt");
    });
  });
});

// Server starten
const port = 6969;
server.listen(port, () => {
  console.log(`NoOS läuft auf http://localhost:${port}`);
});
