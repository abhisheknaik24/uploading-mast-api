"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
    categories: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Categories',
            required: true,
        },
    ],
    title: { type: String, maxLength: 255, required: true },
    desc: { type: String, maxLength: 255, required: true },
    author: { type: String, maxLength: 255 },
    thumbnail: { type: String, maxLength: 255 },
    audio: { type: String, maxLength: 255, required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Song = (0, mongoose_1.model)('Songs', songSchema);
exports.default = Song;
//# sourceMappingURL=songs.js.map