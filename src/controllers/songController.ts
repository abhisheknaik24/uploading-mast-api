import { Request, Response } from 'express';
import Category from '../models/categories';
import Library from '../models/libraries';
import Song from '../models/songs';
import { ICategory, ILibrary, ISong } from '../types/types';

const getCategories = async (req: Request, res: Response) => {
  if (req.method !== 'GET') {
    return res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }

  try {
    const categories: ICategory[] = await Category.find({ isActive: true });

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully!',
      data: { categories: categories },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: String(error),
    });
  }
};

const getSongs = async (req: Request, res: Response) => {
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
    const songs: ISong[] = await Song.find({
      categories: { $in: [categoryId] },
      isActive: true,
    });

    res.status(200).json({
      success: true,
      message: 'Songs fetched successfully!',
      data: { songs: songs },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: String(error),
    });
  }
};

const getSearchSongs = async (req: Request, res: Response) => {
  if (req.method !== 'GET') {
    return res.status(400).json({
      success: false,
      message: 'Request method is not allowed!',
    });
  }

  const { search } = req.query;

  try {
    if (search) {
      const songs: ISong[] = await Song.find({
        title: { $regex: search.toString().toLowerCase(), $options: 'i' },
        isActive: true,
      });

      return res.status(200).json({
        success: true,
        message: 'Search songs fetched successfully!',
        data: { songs: songs },
      });
    }

    const songs: ISong[] = await Song.find({ isActive: true });

    res.status(200).json({
      success: true,
      message: 'Search songs fetched successfully!',
      data: { songs: songs },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: String(error),
    });
  }
};

const getLibrarySongs = async (req: Request, res: Response) => {
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
    const librarySongs: ILibrary[] = await Library.find({
      user: req.user._id,
      isActive: true,
    }).populate('song');

    const songs = librarySongs.map((librarySong) => librarySong.song);

    res.status(200).json({
      success: true,
      message: 'Library songs fetched successfully!',
      data: { librarySongs: songs },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: String(error),
    });
  }
};

const addCategory = async (req: Request, res: Response) => {
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
    const nameData: string = name.toLowerCase();

    const categoryData: string = nameData.replace(' ', '-');

    const category: ICategory = new Category({
      category: categoryData,
      name: nameData,
    });

    await category.save();

    const categories: ICategory[] = await Category.find({ isActive: true });

    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully!',
      data: { categories: categories },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: String(error),
    });
  }
};

const addSong = async (req: Request, res: Response) => {
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
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    let thumbnail: string | undefined = undefined;

    let audio: string | undefined = undefined;

    files.map((file: Express.Multer.File) => {
      if (file.mimetype.split('/')[0] === 'image') {
        thumbnail = file.originalname;
      } else if (file.mimetype.split('/')[0] === 'audio') {
        audio = file.originalname;
      } else {
        return;
      }
    });

    if (!audio) {
      return res.status(400).json({
        success: false,
        message: 'Request files is missing!',
      });
    }

    const song: ISong = new Song({
      categories: [categoryId],
      title: title.toLowerCase(),
      desc: desc.toLowerCase(),
      author: author.toLowerCase(),
      thumbnail: thumbnail,
      audio: audio,
    });

    await song.save();

    const songs: ISong[] = await Song.find({ isActive: true });

    res.status(200).json({
      success: true,
      message: 'Song added successfully!',
      data: { songs: songs },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: String(error),
    });
  }
};

const addSongToLibrary = async (req: Request, res: Response) => {
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
    const song = (await Song.findOne({ _id: id })) as ISong;

    const librarySongExists = await Library.exists({
      user: req.user._id,
      song: song._id,
    });

    if (librarySongExists) {
      return res.status(400).json({
        success: false,
        message: 'Library song already exists!',
      });
    }

    const library: ILibrary = new Library({
      user: req.user._id,
      song: song._id,
    });

    await library.save();

    const librarySongs: ILibrary[] = await Library.find({
      user: req.user._id,
      isActive: true,
    }).populate('song');

    const songs = librarySongs.map((librarySong) => librarySong.song);

    res.status(200).json({
      success: true,
      message: 'Library song added successfully!',
      data: { librarySongs: songs },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: String(error),
    });
  }
};

export default {
  getCategories,
  getSongs,
  getSearchSongs,
  getLibrarySongs,
  addCategory,
  addSong,
  addSongToLibrary,
};
