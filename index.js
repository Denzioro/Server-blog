import express from 'express';

const app = express();

const PORT = 4444;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`server start on PORT ${PORT}`);
});
