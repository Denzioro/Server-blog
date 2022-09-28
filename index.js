import express from 'express';

import mongoose from 'mongoose';
const PORT = 4444;
import {
  registrValidation,
  loginValidation,
  postCreateValidation,
} from './validations/validations.js';

import checkAuth from './utils/checkAuth.js';
import * as UserControler from './controlers/UserControler.js';
import * as PostControler from './controlers/PostControler.js';

mongoose
  .connect(
    'mongodb+srv://blogUser:ererer@cluster0.wrwomv7.mongodb.net/blog?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connection to DB - OK!'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('app started');
});

app.post('/auth/login', loginValidation, UserControler.login);

app.post('/auth/registr', registrValidation, UserControler.register);

app.get('/auth/me', checkAuth, UserControler.getMe);

app.get('/posts', PostControler.getAllPosts);
app.post('/posts', checkAuth, postCreateValidation, PostControler.create);
app.delete('/posts/:id', checkAuth, PostControler.removePost);
app.patch('/posts/:id', checkAuth, PostControler.updatePost);
app.get('/posts/:id', PostControler.getOnePost);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server start on PORT ${PORT}`);
});
