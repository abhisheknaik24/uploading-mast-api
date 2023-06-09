"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const librarySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    song: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Songs', required: true },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
const Library = (0, mongoose_1.model)('Libraries', librarySchema);
exports.default = Library;
//# sourceMappingURL=libraries.js.map