import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const suffix = new Date().toDateString();
    const extention = file.mimetype.split('/').pop();
    cb(null, `${file.fieldname}_${suffix}.${extention}`);
  }
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const supportedFormat = ['image/png', 'image/jpeg', 'image/jpg'];
    if (supportedFormat.includes(file.mimetype)) return cb(null, true);
    return cb(null, false);
  },
  limits: { fileSize: 5 * 10e5 }
}).single('avatar');
