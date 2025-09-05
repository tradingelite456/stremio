const { addonBuilder } = require("stremio-addon-sdk");

// --- Mapping IMDb IDs -> flux M3U8 ---
const streams = {
    "tt0133093": [
        { title: "Serveur 1", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
    ],
    "tt0944947:1:1": [
        { title: "GoT S01E01", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
    ]
};

// --- Manifest ---
const manifest = {
    id: "org.monavon.addon",
    version: "1.0.0",
    name: "Mon Addon Streams",
    description: "Addon perso qui fournit uniquement des flux M3U8",
    types: ["movie", "series"],
    resources: ["stream"],
    idPrefixes: ["tt"]
};

const builder = new addonBuilder(manifest);

builder.defineStreamHandler(({ id }) => {
    return Promise.resolve({ streams: streams[id] || [] });
});

// --- Interface Stremio ---
const addonInterface = builder.getInterface();

// --- Export Vercel handler ---
module.exports = (req, res) => {
    // On force Content-Type = JSON
    res.setHeader("Content-Type", "application/json");

    // Parse la requête de Stremio
    const url = req.url;

    if (url === "/manifest.json") {
        res.end(JSON.stringify(manifest));
    } else if (url.startsWith("/stream")) {
        return addonInterface(req, res);
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Not found" }));
    }
};
