import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';

import {
  registrValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validations.js';

import { UserControler, PostControler } from './controlers/allImports.js';

import { checkAuth, handleValidationErrors } from './utils/allUtils.js';

mongoose
  .connect(
    'mongodb+srv://blogUser:ererer@cluster0.wrwomv7.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connection to DB - OK!'))
  .catch((err) => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('app started');
});

app.post(
  '/auth/login',
  loginValidation,
  handleValidationErrors,
  UserControler.login
);
app.post(
  '/auth/registr',
  registrValidation,
  handleValidationErrors,
  UserControler.register
);
app.get('/auth/me', checkAuth, UserControler.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get('/posts', PostControler.getAllPosts);
app.get('/posts/:id', PostControler.getOnePost);
app.post(
  '/posts',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControler.create
);
app.delete('/posts/:id', checkAuth, PostControler.removePost);
app.patch(
  '/posts/:id',
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControler.updatePost
);

const PORT = 4444;
app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server start on PORT ${PORT}`);
});
