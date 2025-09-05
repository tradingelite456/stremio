const { addonBuilder } = require("stremio-addon-sdk");

// --- Mapping IDs -> flux ---
const streams = {
    "tt0133093": [
        { title: "Serveur 1", url: "https://exemple.com/flux/matrix.m3u8" }
    ],
    "tt0944947:1:1": [
        { title: "GoT S01E01 - Serveur 1", url: "https://exemple.com/flux/got-s01e01.m3u8" }
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

// --- Builder ---
const builder = new addonBuilder(manifest);

builder.defineStreamHandler(({ id }) => {
    return Promise.resolve({ streams: streams[id] || [] });
});

// --- Export spécial pour Vercel ---
module.exports = (req, res) => {
    const { pathname, query } = require("url").parse(req.url, true);

    // route /manifest.json
    if (pathname === "/manifest.json") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(manifest));
    }
    // route /stream
    else if (pathname.startsWith("/stream")) {
        builder.getInterface()(req, res);
    }
    else {
        res.statusCode = 404;
        res.end("Not found");
    }
};
