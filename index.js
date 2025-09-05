const { addonBuilder } = require("stremio-addon-sdk");
const manifest = require("./manifest.json");

const builder = new addonBuilder(manifest);

// Mapping IMDb IDs → flux M3U8
const streams = {
    "tt0133093": [
        { title: "Matrix HLS", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
    ],
    "tt0944947:1:1": [
        { title: "GoT S01E01 HLS", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" }
    ]
};

builder.defineStreamHandler(({ id }) => {
    return Promise.resolve({ streams: streams[id] || [] });
});

module.exports = builder.getInterface();
