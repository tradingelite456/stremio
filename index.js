const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    id: "org.monavon.hls",
    version: "1.0.0",
    name: "Mon Addon HLS",
    description: "Addon qui fournit uniquement des liens HLS (M3U8)",
    resources: ["stream"],
    types: ["movie", "series"],
    idPrefixes: ["tt"] // IDs IMDb
};

const builder = new addonBuilder(manifest);

// 🔗 Exemple de mapping ID -> Flux M3U8
const streams = {
    "tt0133093": [
        {
            title: "Matrix HLS",
            url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        }
    ],
    "tt0944947:1:1": [
        {
            title: "GoT S01E01",
            url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        }
    ]
};

// 🎬 Stream handler (seulement les sources de lecture)
builder.defineStreamHandler(({ id }) => {
    return Promise.resolve({ streams: streams[id] || [] });
});

// 🚀 Export
module.exports = builder.getInterface();
