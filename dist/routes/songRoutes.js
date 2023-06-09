"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songController_1 = __importDefault(require("../controllers/songController"));
const jwt_1 = require("../middlewares/jwt");
const upload_1 = __importDefault(require("../middlewares/upload"));
const router = express_1.default.Router();
router.get('/getCategories', songController_1.default.getCategories);
router.get('/getSongs/:categoryId', songController_1.default.getSongs);
router.get('/getSearchSongs', songController_1.default.getSearchSongs);
router.get('/getLibrarySongs', jwt_1.verifyJWTToken, songController_1.default.getLibrarySongs);
router.post('/addCategory', jwt_1.verifyJWTToken, songController_1.default.addCategory);
router.post('/addSong', jwt_1.verifyJWTToken, upload_1.default.array('files'), songController_1.default.addSong);
router.post('/addSongToLibrary', jwt_1.verifyJWTToken, songController_1.default.addSongToLibrary);
exports.default = router;
//# sourceMappingURL=songRoutes.js.map