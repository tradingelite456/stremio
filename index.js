const { addonBuilder } = require("stremio-addon-sdk");

// --- Associe tes IDs IMDb aux flux M3U8 ---
const streams = {
    "tt0133093": [  // Matrix
        {
            title: "Serveur 1",
            url: "https://exemple.com/flux/matrix.m3u8"
        }
    ],
    "tt0944947:1:1": [ // Game of Thrones S01E01
        {
            title: "Episode 1 - Serveur 1",
            url: "https://exemple.com/flux/got-s01e01.m3u8"
        }
    ]
};

// --- Manifest de ton addon ---
const manifest = {
    id: "org.monavon.addon",
    version: "1.0.0",
    name: "Mon Addon Streams",
    description: "Addon perso qui fournit uniquement des flux M3U8",
    types: ["movie", "series"],
    resources: ["stream"],
    idPrefixes: ["tt"]
};

// --- Implémentation ---
const builder = new addonBuilder(manifest);

builder.defineStreamHandler((args) => {
    const id = args.id;
    const response = streams[id] || [];
    return Promise.resolve({ streams: response });
});

// Export pour Vercel
module.exports = (req, res) => {
    builder.getInterface()(req, res);
};
