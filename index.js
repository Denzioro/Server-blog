import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose
  .connect(
    'mongodb+srv://blogUser:ererer@cluster0.wrwomv7.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('Connection to DB - OK!'))
  .catch((err) => console.log('DB error', err));

const app = express();

const PORT = 4444;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server start on PORT ${PORT}`);
});
