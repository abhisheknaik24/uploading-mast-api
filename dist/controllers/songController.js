"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = __importDefault(require("../models/categories"));
const libraries_1 = __importDefault(require("../models/libraries"));
const songs_1 = __importDefault(require("../models/songs"));
const getCategories = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
    try {
        const categories = await categories_1.default.find({ isActive: true });
        res.status(200).json({
            success: true,
            message: 'Categories fetched successfully!',
            data: { categories: categories },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: String(error),
        });
    }
};
const getSongs = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
    const { categoryId } = req.params;
    if (!categoryId) {
        return res.status(400).json({
            success: false,
            message: 'Request params is missing!',
        });
    }
    try {
        const songs = await songs_1.default.find({
            categories: { $in: [categoryId] },
            isActive: true,
        });
        res.status(200).json({
            success: true,
            message: 'Songs fetched successfully!',
            data: { songs: songs },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: String(error),
        });
    }
};
const getSearchSongs = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
    const { search } = req.query;
    try {
        if (search) {
            const songs = await songs_1.default.find({
                title: { $regex: search.toString().toLowerCase(), $options: 'i' },
                isActive: true,
            });
            return res.status(200).json({
                success: true,
                message: 'Search songs fetched successfully!',
                data: { songs: songs },
            });
        }
        const songs = await songs_1.default.find({ isActive: true });
        res.status(200).json({
            success: true,
            message: 'Search songs fetched successfully!',
            data: { songs: songs },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: String(error),
        });
    }
};
const getLibrarySongs = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
    if (!req.user) {
        return res.status(400).json({
            success: false,
            message: 'User is missing!',
        });
    }
    try {
        const librarySongs = await libraries_1.default.find({
            user: req.user._id,
            isActive: true,
        }).populate('song');
        const songs = librarySongs.map((librarySong) => librarySong.song);
        res.status(200).json({
            success: true,
            message: 'Library songs fetched successfully!',
            data: { librarySongs: songs },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: String(error),
        });
    }
};
const addCategory = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            message: 'Request body is missing!',
        });
    }
    try {
        const nameData = name.toLowerCase();
        const categoryData = nameData.replace(' ', '-');
        const category = new categories_1.default({
            category: categoryData,
            name: nameData,
        });
        await category.save();
        const categories = await categories_1.default.find({ isActive: true });
        res.status(200).json({
            success: true,
            message: 'Categories fetched successfully!',
            data: { categories: categories },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: String(error),
        });
    }
};
const addSong = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
    const { categoryId, title, desc, author } = req.body;
    if (!categoryId || !title || !desc || !author || !req.files) {
        return res.status(400).json({
            success: false,
            message: 'Request body is missing!',
        });
    }
    try {
        const files = req.files;
        let thumbnail = null;
        let audio = null;
        files.map((file) => {
            if (file.mimetype.split('/')[0] === 'image') {
                thumbnail = file.originalname;
            }
            else if (file.mimetype.split('/')[0] === 'audio') {
                audio = file.originalname;
            }
            else {
                thumbnail = null;
                audio = null;
            }
        });
        if (!thumbnail || !audio) {
            return res.status(400).json({
                success: false,
                message: 'Request files is missing!',
            });
        }
        const song = new songs_1.default({
            categories: [categoryId],
            title: title.toLowerCase(),
            desc: desc.toLowerCase(),
            author: author.toLowerCase(),
            thumbnail: thumbnail,
            audio: audio,
        });
        await song.save();
        const songs = await songs_1.default.find({ isActive: true });
        res.status(200).json({
            success: true,
            message: 'Song added successfully!',
            data: { songs: songs },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: String(error),
        });
    }
};
const addSongToLibrary = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(400).json({
            success: false,
            message: 'Request method is not allowed!',
        });
    }
    if (!req.user) {
        return res.status(400).json({
            success: false,
            message: 'User is missing!',
        });
    }
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Request body is missing!',
        });
    }
    try {
        const song = (await songs_1.default.findOne({ _id: id }));
        const librarySongExists = await libraries_1.default.exists({
            user: req.user._id,
            song: song._id,
        });
        if (librarySongExists) {
            return res.status(400).json({
                success: false,
                message: 'Library song already exists!',
            });
        }
        const library = new libraries_1.default({
            user: req.user._id,
            song: song._id,
        });
        await library.save();
        const librarySongs = await libraries_1.default.find({
            user: req.user._id,
            isActive: true,
        }).populate('song');
        const songs = librarySongs.map((librarySong) => librarySong.song);
        res.status(200).json({
            success: true,
            message: 'Library song added successfully!',
            data: { librarySongs: songs },
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: String(error),
        });
    }
};
exports.default = {
    getCategories,
    getSongs,
    getSearchSongs,
    getLibrarySongs,
    addCategory,
    addSong,
    addSongToLibrary,
};
//# sourceMappingURL=songController.js.map