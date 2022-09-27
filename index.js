import express from 'express';

import mongoose from 'mongoose';

import { registrValidation } from './validations/auth.js ';

import checkAuth from './utils/checkAuth.js';
import * as UserControler from './controlers/UserControler.js';

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

app.post('/auth/login', UserControler.login);

app.post('/auth/registr', registrValidation, UserControler.register);

app.get('/auth/me', checkAuth, UserControler.getMe);
const PORT = 4444;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server start on PORT ${PORT}`);
});
