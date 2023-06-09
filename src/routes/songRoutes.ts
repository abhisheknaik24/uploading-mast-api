import express, { Router } from 'express';
import songController from '../controllers/songController';
import { verifyJWTToken } from '../middlewares/jwt';
import upload from '../middlewares/upload';

const router: Router = express.Router();

router.get('/getCategories', songController.getCategories);

router.get('/getSongs/:categoryId', songController.getSongs);

router.get('/getSearchSongs', songController.getSearchSongs);

router.get('/getLibrarySongs', verifyJWTToken, songController.getLibrarySongs);

router.post('/addCategory', verifyJWTToken, songController.addCategory);

router.post(
  '/addSong',
  verifyJWTToken,
  upload.array('files'),
  songController.addSong
);

router.post(
  '/addSongToLibrary',
  verifyJWTToken,
  songController.addSongToLibrary
);

export default router;
