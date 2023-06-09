import fs from 'fs';
import multer, { Multer, StorageEngine } from 'multer';

const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, callback) => {
    let dir: string = '';

    if (file.mimetype.split('/')[0] === 'image') {
      dir = './public/images';
    } else if (file.mimetype.split('/')[0] === 'audio') {
      dir = './public/audio';
    } else {
      dir = './public/uploads';
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    callback(null, dir);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const uploadAudio: Multer = multer({ storage: storage });

export default uploadAudio;
