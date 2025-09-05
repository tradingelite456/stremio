const { addonBuilder } = require("stremio-addon-sdk");
const manifest = require("./manifest.json");

const builder = new addonBuilder(manifest);

const streams = {
  "tt20969586": [
    { title: "Thunderbolts", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
  ]
};

builder.defineStreamHandler(({ id }) => {
  return Promise.resolve({ streams: streams[id] || [] });
});

// --- Serveur minimal pour Vercel + CORS ---
const addonInterface = builder.getInterface();

module.exports = (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    return res.end();
  }

  // Gère manifest.json correctement
  if (req.url === "/manifest.json") {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(manifest));
  }

  // Tout le reste passe par Stremio SDK
  addonInterface(req, res);
};
